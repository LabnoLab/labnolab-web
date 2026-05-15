import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { z } from 'npm:zod@3.23.8';

const GATEWAY_URL = 'https://connector-gateway.lovable.dev/airtable';
const BASE_NAME = 'CRM Academy';
const TABLE_NAME = 'Personas';

const BodySchema = z.object({
  name: z.string().trim().min(1).max(100),
  surname: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(5).max(30),
  wants_whatsapp_info: z.boolean().default(false),
});

let cachedBaseId: string | null = null;

async function resolveBaseId(lovableKey: string, airtableKey: string): Promise<string> {
  if (cachedBaseId) return cachedBaseId;
  const res = await fetch(`${GATEWAY_URL}/v0/meta/bases`, {
    headers: {
      Authorization: `Bearer ${lovableKey}`,
      'X-Connection-Api-Key': airtableKey,
    },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`Airtable bases list failed [${res.status}]: ${JSON.stringify(data)}`);
  const match = (data.bases || []).find((b: any) => b.name === BASE_NAME);
  if (!match) throw new Error(`Base "${BASE_NAME}" not found in Airtable workspace`);
  cachedBaseId = match.id;
  return match.id;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) throw new Error('LOVABLE_API_KEY is not configured');
    const AIRTABLE_API_KEY = Deno.env.get('AIRTABLE_API_KEY');
    if (!AIRTABLE_API_KEY) throw new Error('AIRTABLE_API_KEY is not configured');

    const parsed = BodySchema.safeParse(await req.json());
    if (!parsed.success) {
      return new Response(JSON.stringify({ error: parsed.error.flatten().fieldErrors }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    const { name, surname, email, phone, wants_whatsapp_info } = parsed.data;

    const baseId = await resolveBaseId(LOVABLE_API_KEY, AIRTABLE_API_KEY);

    const res = await fetch(`${GATEWAY_URL}/v0/${baseId}/${encodeURIComponent(TABLE_NAME)}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        'X-Connection-Api-Key': AIRTABLE_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        records: [{
          fields: {
            'Nombre': name,
            'Apellido': surname,
            'Email': email,
            'Móvil': phone,
            'Quiere WhatsApp': wants_whatsapp_info,
            'Origen': 'Web - Dossier',
            'Fecha primer contacto': new Date().toISOString().slice(0, 10),
          },
        }],
        typecast: true,
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(`Airtable create failed [${res.status}]: ${JSON.stringify(data)}`);

    return new Response(JSON.stringify({ success: true, id: data.records?.[0]?.id }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: unknown) {
    console.error('airtable-signup error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ success: false, error: message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});