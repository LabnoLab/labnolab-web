import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
const GATEWAY_URL = 'https://connector-gateway.lovable.dev/airtable';
Deno.serve(async () => {
  const lk = Deno.env.get('LOVABLE_API_KEY')!;
  const ak = Deno.env.get('AIRTABLE_API_KEY')!;
  const bases = await (await fetch(`${GATEWAY_URL}/v0/meta/bases`, {
    headers: { Authorization: `Bearer ${lk}`, 'X-Connection-Api-Key': ak },
  })).json();
  const base = (bases.bases || []).find((b: any) => b.name === 'CRM Academy');
  const schema = await (await fetch(`${GATEWAY_URL}/v0/meta/bases/${base.id}/tables`, {
    headers: { Authorization: `Bearer ${lk}`, 'X-Connection-Api-Key': ak },
  })).json();
  const personas = (schema.tables || []).find((t: any) => t.name === 'Personas');
  return new Response(JSON.stringify({ baseId: base.id, fields: personas?.fields?.map((f: any) => ({ name: f.name, type: f.type })) }, null, 2), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
});