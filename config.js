window.APP_CONFIG = {
  // ─── Supabase (salvataggio lead nel database) ─────────────────
  // Lascia vuoto se non usi Supabase — il modulo funzionerà solo via EmailJS
  SUPABASE_URL:             '',  // es. https://xyzxyz.supabase.co
  SUPABASE_PUBLISHABLE_KEY: '',  // anon / public key
  SUPABASE_LEADS_TABLE:     'leads',

  // ─── EmailJS (notifica email ad ogni richiesta) ───────────────
  // Guida rapida:
  //   1. Crea account gratuito → https://app.emailjs.com/sign-up
  //   2. "Email Services" → "Add New Service" → collega Gmail o SMTP
  //   3. "Email Templates" → "Create New Template"
  //      Oggetto suggerito: Nuova richiesta da {{from_name}}
  //      Corpo — incolla questo blocco nel template:
  //
  //        Da: {{from_name}} ({{from_email}})
  //        Tel: {{phone}}
  //        Immobile: {{property_type}} — {{property_address}}
  //        Interesse: {{intent}}
  //
  //        Messaggio:
  //        {{message}}
  //
  //      Imposta "Reply To" → {{reply_to}}
  //   4. "Account" → "API Keys" → copia la Public Key
  //
  EMAILJS_PUBLIC_KEY:  '',  // Account → API Keys → Public Key
  EMAILJS_SERVICE_ID:  '',  // Email Services → Service ID  (es. service_abc123)
  EMAILJS_TEMPLATE_ID: '',  // Email Templates → Template ID (es. template_xyz789)
};
