
-- Partners table
CREATE TABLE public.partners (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  logo_url TEXT,
  website_url TEXT,
  category TEXT NOT NULL DEFAULT 'empresa',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Partners are viewable by everyone"
  ON public.partners FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admins can manage partners"
  ON public.partners FOR ALL
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Partner inquiries table
CREATE TABLE public.partner_inquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  organization TEXT NOT NULL,
  role TEXT NOT NULL,
  email TEXT NOT NULL,
  org_type TEXT NOT NULL,
  collaboration_types TEXT[] NOT NULL DEFAULT '{}',
  message TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.partner_inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit partner inquiry"
  ON public.partner_inquiries FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can view partner inquiries"
  ON public.partner_inquiries FOR SELECT
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update partner inquiries"
  ON public.partner_inquiries FOR UPDATE
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Case studies table
CREATE TABLE public.case_studies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  author_first_name TEXT NOT NULL,
  author_last_initial TEXT NOT NULL,
  author_school TEXT,
  cohort_label TEXT,
  company_name TEXT NOT NULL,
  company_ticker TEXT,
  company_sector TEXT,
  summary TEXT NOT NULL,
  content TEXT NOT NULL,
  key_metrics JSONB DEFAULT '[]',
  verdict TEXT,
  is_published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  user_id UUID
);

ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published case studies"
  ON public.case_studies FOR SELECT
  USING (is_published = true);

CREATE POLICY "Authenticated users can view own case studies"
  ON public.case_studies FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can insert case studies"
  ON public.case_studies FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can manage case studies"
  ON public.case_studies FOR ALL
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
