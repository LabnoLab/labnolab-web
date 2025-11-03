-- Add surname column to course_downloads table
ALTER TABLE course_downloads ADD COLUMN surname TEXT NOT NULL DEFAULT '';

-- Make phone column required
ALTER TABLE course_downloads ALTER COLUMN phone SET NOT NULL;