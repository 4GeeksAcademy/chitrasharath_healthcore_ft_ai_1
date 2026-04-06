const form = document.getElementById("patientEnquiryForm");
const clearBtn = document.getElementById("clearFormBtn");
const successMessage = document.getElementById("successMessage");
const successOkBtn = document.getElementById("successOkBtn");
const eveningWarning = document.getElementById("eveningWarning");
const patientIdWrapper = document.getElementById("patientIdWrapper");
const insuranceFields = document.getElementById("insuranceFields");
const concernField = document.getElementById("health_concern");
const concernCounter = document.getElementById("health_concern_counter");
const langButtons = document.querySelectorAll("[data-lang-btn]");

const clinicClosingHour = {
  "HealthCore Austin Central": 20,
  "HealthCore Austin North": 19,
  "HealthCore San Antonio": 18,
  "HealthCore Miami": 20,
  "HealthCore Orlando": 18,
  "HealthCore Atlanta": 19
};

const t = {
  en: {
    skip: "Skip to main content",
    navHome: "Home",
    navServices: "Services",
    navLocations: "Locations",
    navContact: "Contact",
    navApply: "Request an appointment",
    formTitle: "Patient Enquiry Form",
    formIntro:
      "Complete this form and our front desk will contact you within 1 business day to confirm your appointment details.",
    partnerNote:
      "Are you a healthcare provider or organisation looking to partner with HealthCore? Contact our operations team at partnerships@healthcore.com",
    requiredHint: "Fields marked with * are required.",
    personalLegend: "Personal information",
    firstNameLabel: "First name *",
    lastNameLabel: "Last name *",
    dobLabel: "Date of birth *",
    emailLabel: "Email address *",
    phoneLabel: "Phone number *",
    visitLegend: "Visit preferences",
    preferredLanguageLabel: "Preferred language *",
    preferredClinicLabel: "Preferred clinic *",
    preferredDateLabel: "Preferred date *",
    preferredTimeLabel: "Preferred time of day *",
    serviceTypeLabel: "Service needed *",
    coverageLegend: "Visit and coverage details",
    newPatientQuestion: "Is this your first visit to HealthCore? *",
    insuranceQuestion: "Do you have health insurance? *",
    patientIdLabel: "Patient ID (optional)",
    insuranceProviderLabel: "Insurance provider *",
    memberIdLabel: "Member ID *",
    concernLegend: "Health concern",
    healthConcernLabel: "Brief description of your health concern *",
    consentLabel: "I consent to HealthCore contacting me *",
    submitBtn: "Submit enquiry",
    clearBtn: "Clear form",
    successTitle: "Thank you for reaching out to HealthCore.",
    successBody1:
      "We have received your enquiry. A member of our front desk team will contact you within 1 business day to confirm your appointment details and answer any questions.",
    successBody2:
      "If you need urgent assistance, please call your preferred clinic directly using the numbers listed on our website.",
    successBody3: "We look forward to caring for you.",
    successOkBtn: "OK",
    seoByline: "Prepared by HealthCore Digital. Reviewed by Priya Nair, Head of Patient Experience.",
    seoSources: "Source basis: HealthCore company briefing and milestone context (internal, 2026).",
    footerCopyright: "© 2025 HealthCore. All rights reserved.",
    selectOption: "Select an option",
    langEnglish: "English",
    langSpanish: "Spanish",
    timeMorning: "Morning (7am-12pm)",
    timeAfternoon: "Afternoon (12pm-5pm)",
    timeEvening: "Evening (5pm-8pm)",
    servicePrimary: "Primary Care",
    serviceChronic: "Chronic Disease Management",
    serviceSpecialist: "Specialist Consultation",
    servicePreventive: "Preventive Health",
    serviceWomens: "Women's Health",
    servicePaediatric: "Paediatric Care",
    serviceMental: "Mental Health",
    yes: "Yes",
    no: "No",
    errors: {
      first_name: "First name must contain only letters and be at least 2 characters",
      last_name: "Last name must contain only letters and be at least 2 characters",
      date_of_birth: "Enter a valid date of birth. Patient must be between 0 and 120 years old",
      email: "Enter a valid email address (example: name@provider.com)",
      phone: "Phone must include a country code (example: +1 305 555 0191)",
      preferred_language: "Select your preferred language",
      preferred_clinic: "Select the clinic you would like to visit",
      preferred_date: "Select a date at least 1 business day from today and no more than 60 days ahead",
      preferred_time: "Select your preferred time of day",
      service_type: "Select the type of care you are looking for",
      paediatric:
        "Paediatric Care is available for patients under 18. Please check the date of birth or select a different service.",
      new_patient: "Please indicate whether this is your first visit to HealthCore",
      has_insurance: "Please indicate whether you have health insurance",
      insurance_provider: "Please enter your insurance provider name",
      insurance_member_id: "Member ID must be between 6 and 20 alphanumeric characters",
      patient_id: "Patient ID must follow format HC-A3F291",
      contact_consent: "You must consent to being contacted before submitting this form"
    },
    healthConcernBase: "Please describe your health concern in at least 20 characters",
    healthConcernRemaining: "characters remaining",
    warningEvening:
      "Evening availability may be limited at this clinic based on closing time. Our team will confirm the closest available slot."
  },
  es: {
    skip: "Saltar al contenido principal",
    navHome: "Inicio",
    navServices: "Servicios",
    navLocations: "Ubicaciones",
    navContact: "Contacto",
    navApply: "Solicitar una cita",
    formTitle: "Formulario de consulta del paciente",
    formIntro:
      "Completa este formulario y nuestro equipo de recepcion te contactara dentro de 1 dia habil para confirmar los detalles de tu cita.",
    partnerNote:
      "Eres un proveedor de salud u organizacion que busca colaborar con HealthCore? Contacta a nuestro equipo de operaciones en partnerships@healthcore.com",
    requiredHint: "Los campos marcados con * son obligatorios.",
    personalLegend: "Informacion personal",
    firstNameLabel: "Nombre *",
    lastNameLabel: "Apellido *",
    dobLabel: "Fecha de nacimiento *",
    emailLabel: "Correo electronico *",
    phoneLabel: "Numero de telefono *",
    visitLegend: "Preferencias de visita",
    preferredLanguageLabel: "Idioma preferido *",
    preferredClinicLabel: "Clinica preferida *",
    preferredDateLabel: "Fecha preferida *",
    preferredTimeLabel: "Horario preferido *",
    serviceTypeLabel: "Servicio que necesitas *",
    coverageLegend: "Detalles de visita y cobertura",
    newPatientQuestion: "Es tu primera visita a HealthCore? *",
    insuranceQuestion: "Tienes seguro medico? *",
    patientIdLabel: "ID de paciente (opcional)",
    insuranceProviderLabel: "Proveedor de seguro *",
    memberIdLabel: "ID de miembro *",
    concernLegend: "Motivo de salud",
    healthConcernLabel: "Breve descripcion de tu motivo de salud *",
    consentLabel: "Doy mi consentimiento para que HealthCore me contacte *",
    submitBtn: "Enviar consulta",
    clearBtn: "Limpiar formulario",
    successTitle: "Gracias por comunicarte con HealthCore.",
    successBody1:
      "Hemos recibido tu consulta. Un miembro de nuestro equipo de recepcion te contactara dentro de 1 dia habil para confirmar los detalles de tu cita y responder tus preguntas.",
    successBody2:
      "Si necesitas asistencia urgente, llama directamente a tu clinica preferida usando los numeros listados en nuestro sitio web.",
    successBody3: "Esperamos poder atenderte pronto.",
    successOkBtn: "OK",
    seoByline: "Preparado por HealthCore Digital. Revisado por Priya Nair, directora de experiencia del paciente.",
    seoSources: "Base de fuentes: resumen corporativo y contexto del hito de HealthCore (interno, 2026).",
    footerCopyright: "© 2025 HealthCore. Todos los derechos reservados.",
    selectOption: "Selecciona una opcion",
    langEnglish: "Ingles",
    langSpanish: "Espanol",
    timeMorning: "Manana (7am-12pm)",
    timeAfternoon: "Tarde (12pm-5pm)",
    timeEvening: "Noche (5pm-8pm)",
    servicePrimary: "Atencion Primaria",
    serviceChronic: "Manejo de Enfermedades Cronicas",
    serviceSpecialist: "Consulta con Especialista",
    servicePreventive: "Salud Preventiva",
    serviceWomens: "Salud de la Mujer",
    servicePaediatric: "Atencion Pediatrica",
    serviceMental: "Salud Mental",
    yes: "Si",
    no: "No",
    errors: {
      first_name: "El nombre debe contener solo letras y al menos 2 caracteres",
      last_name: "El apellido debe contener solo letras y al menos 2 caracteres",
      date_of_birth: "Ingresa una fecha de nacimiento valida. El paciente debe tener entre 0 y 120 anos",
      email: "Ingresa un correo electronico valido (ejemplo: nombre@proveedor.com)",
      phone: "El telefono debe incluir codigo de pais (ejemplo: +1 305 555 0191)",
      preferred_language: "Selecciona tu idioma preferido",
      preferred_clinic: "Selecciona la clinica a la que deseas asistir",
      preferred_date: "Selecciona una fecha al menos 1 dia habil desde hoy y no mas de 60 dias hacia adelante",
      preferred_time: "Selecciona tu horario preferido",
      service_type: "Selecciona el tipo de atencion que buscas",
      paediatric:
        "La atencion pediatrica esta disponible para pacientes menores de 18 anos. Verifica la fecha de nacimiento o selecciona otro servicio.",
      new_patient: "Indica si esta es tu primera visita a HealthCore",
      has_insurance: "Indica si tienes seguro medico",
      insurance_provider: "Ingresa el nombre de tu proveedor de seguro",
      insurance_member_id: "El ID de miembro debe tener entre 6 y 20 caracteres alfanumericos",
      patient_id: "El ID de paciente debe tener formato HC-A3F291",
      contact_consent: "Debes autorizar que te contactemos antes de enviar el formulario"
    },
    healthConcernBase: "Describe tu motivo de salud con al menos 20 caracteres",
    healthConcernRemaining: "caracteres restantes",
    warningEvening:
      "La disponibilidad en horario nocturno puede ser limitada en esta clinica segun su hora de cierre. Nuestro equipo confirmara el horario mas cercano disponible."
  }
};

function getInitialLanguage() {
  const urlLang = new URLSearchParams(window.location.search).get("lang");
  if (urlLang === "en" || urlLang === "es") return urlLang;

  const storedLang = localStorage.getItem("healthcore_lang");
  if (storedLang === "en" || storedLang === "es") return storedLang;

  return "en";
}

let currentLang = getInitialLanguage();

const fieldValidators = {
  first_name: validateName,
  last_name: validateName,
  date_of_birth: validateDob,
  email: validateEmail,
  phone: validatePhone,
  preferred_language: validateRequiredSelect,
  preferred_clinic: validateRequiredSelect,
  preferred_date: validatePreferredDate,
  preferred_time: validateRequiredSelect,
  service_type: validateService,
  new_patient: validateNewPatient,
  has_insurance: validateHasInsurance,
  insurance_provider: validateInsuranceProvider,
  insurance_member_id: validateMemberId,
  patient_id: validatePatientId,
  health_concern: validateHealthConcern,
  contact_consent: validateConsent
};

function parseDate(value) {
  if (!value) return null;
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return null;
  return new Date(year, month - 1, day);
}

function normalizeToday() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

function calcAge(dob) {
  const today = normalizeToday();
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age -= 1;
  }
  return age;
}

function getNextBusinessDay(fromDate) {
  const date = new Date(fromDate);
  date.setDate(date.getDate() + 1);
  while (date.getDay() === 0 || date.getDay() === 6) {
    date.setDate(date.getDate() + 1);
  }
  date.setHours(0, 0, 0, 0);
  return date;
}

function getMaxPreferredDate(fromDate) {
  const max = new Date(fromDate);
  max.setDate(max.getDate() + 60);
  max.setHours(0, 0, 0, 0);
  return max;
}

function nameIsValid(value) {
  return /^[A-Za-zÀ-ÖØ-öø-ÿ]{2,50}$/.test(value.trim());
}

function showError(name, message) {
  const errorEl = document.getElementById(`${name}_error`);
  const input = form.elements[name];
  if (!errorEl || !input) return;

  errorEl.textContent = message;
  errorEl.classList.remove("hidden");

  if (input instanceof RadioNodeList) {
    Array.from(input).forEach((item) => item.setAttribute("aria-invalid", "true"));
  } else {
    input.setAttribute("aria-invalid", "true");
  }
}

function clearError(name) {
  const errorEl = document.getElementById(`${name}_error`);
  const input = form.elements[name];
  if (!errorEl || !input) return;

  errorEl.textContent = "";
  errorEl.classList.add("hidden");

  if (input instanceof RadioNodeList) {
    Array.from(input).forEach((item) => item.removeAttribute("aria-invalid"));
  } else {
    input.removeAttribute("aria-invalid");
  }
}

function validateName(name) {
  const value = form.elements[name].value;
  if (!nameIsValid(value)) {
    showError(name, t[currentLang].errors[name]);
    return false;
  }
  clearError(name);
  return true;
}

function validateDob() {
  const dobInput = form.elements.date_of_birth;
  const dob = parseDate(dobInput.value);
  const today = normalizeToday();

  if (!dob) {
    showError("date_of_birth", t[currentLang].errors.date_of_birth);
    return false;
  }

  const age = calcAge(dob);
  const valid = dob <= today && age >= 0 && age <= 120;

  if (!valid) {
    showError("date_of_birth", t[currentLang].errors.date_of_birth);
    return false;
  }

  clearError("date_of_birth");
  validateService();
  return true;
}

function validateEmail() {
  const value = form.elements.email.value.trim();
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  if (!valid) {
    showError("email", t[currentLang].errors.email);
    return false;
  }
  clearError("email");
  return true;
}

function validatePhone() {
  const value = form.elements.phone.value.trim();
  const valid = /^\+\d{1,3}[\d\s-]{6,20}$/.test(value);
  if (!valid) {
    showError("phone", t[currentLang].errors.phone);
    return false;
  }
  clearError("phone");
  return true;
}

function validateRequiredSelect(name) {
  const value = form.elements[name].value;
  if (!value) {
    showError(name, t[currentLang].errors[name]);
    return false;
  }
  clearError(name);
  if (name === "preferred_time" || name === "preferred_clinic") {
    updateEveningWarning();
  }
  return true;
}

function validatePreferredDate() {
  const inputValue = form.elements.preferred_date.value;
  const selected = parseDate(inputValue);
  const today = normalizeToday();
  const minDate = getNextBusinessDay(today);
  const maxDate = getMaxPreferredDate(today);

  if (!selected || selected < minDate || selected > maxDate) {
    showError("preferred_date", t[currentLang].errors.preferred_date);
    return false;
  }

  clearError("preferred_date");
  return true;
}

function validateService() {
  const service = form.elements.service_type.value;
  if (!service) {
    showError("service_type", t[currentLang].errors.service_type);
    return false;
  }

  if (service === "Paediatric Care") {
    const dob = parseDate(form.elements.date_of_birth.value);
    if (!dob || calcAge(dob) >= 18) {
      showError("service_type", t[currentLang].errors.paediatric);
      return false;
    }
  }

  clearError("service_type");
  return true;
}

function validateNewPatient() {
  const value = form.elements.new_patient.value;
  if (!value) {
    showError("new_patient", t[currentLang].errors.new_patient);
    return false;
  }
  clearError("new_patient");
  updatePatientIdVisibility();
  return true;
}

function validateHasInsurance() {
  const value = form.elements.has_insurance.value;
  if (!value) {
    showError("has_insurance", t[currentLang].errors.has_insurance);
    return false;
  }
  clearError("has_insurance");
  updateInsuranceVisibility();
  return true;
}

function validateInsuranceProvider() {
  const hasInsurance = form.elements.has_insurance.value === "Yes";
  const value = form.elements.insurance_provider.value.trim();

  if (!hasInsurance) {
    clearError("insurance_provider");
    return true;
  }

  if (!value || value.length > 100) {
    showError("insurance_provider", t[currentLang].errors.insurance_provider);
    return false;
  }

  clearError("insurance_provider");
  return true;
}

function validateMemberId() {
  const hasInsurance = form.elements.has_insurance.value === "Yes";
  const value = form.elements.insurance_member_id.value.trim();

  if (!hasInsurance) {
    clearError("insurance_member_id");
    return true;
  }

  if (!/^[A-Za-z0-9]{6,20}$/.test(value)) {
    showError("insurance_member_id", t[currentLang].errors.insurance_member_id);
    return false;
  }

  clearError("insurance_member_id");
  return true;
}

function validatePatientId() {
  const returningPatient = form.elements.new_patient.value === "No";
  const value = form.elements.patient_id.value.trim();

  if (!returningPatient || value.length === 0) {
    clearError("patient_id");
    return true;
  }

  if (!/^HC-[A-Za-z0-9]{6}$/.test(value)) {
    showError("patient_id", t[currentLang].errors.patient_id);
    return false;
  }

  clearError("patient_id");
  return true;
}

function updateConcernCounter() {
  const length = concernField.value.trim().length;
  concernCounter.textContent = `${length} / 500`;
}

function validateHealthConcern() {
  const value = concernField.value.trim();
  const length = value.length;
  if (length < 20 || length > 500) {
    const remaining = Math.max(0, 20 - length);
    const msg = `${t[currentLang].healthConcernBase} (${remaining} ${t[currentLang].healthConcernRemaining})`;
    showError("health_concern", msg);
    return false;
  }

  clearError("health_concern");
  return true;
}

function validateConsent() {
  const checked = form.elements.contact_consent.checked;
  if (!checked) {
    showError("contact_consent", t[currentLang].errors.contact_consent);
    return false;
  }
  clearError("contact_consent");
  return true;
}

function updatePatientIdVisibility() {
  const returningPatient = form.elements.new_patient.value === "No";
  patientIdWrapper.classList.toggle("hidden", !returningPatient);
}

function updateInsuranceVisibility() {
  const hasInsurance = form.elements.has_insurance.value === "Yes";
  insuranceFields.classList.toggle("hidden", !hasInsurance);
}

function updateEveningWarning() {
  const clinic = form.elements.preferred_clinic.value;
  const time = form.elements.preferred_time.value;

  if (time === "Evening (5pm-8pm)" && clinic && clinicClosingHour[clinic] < 20) {
    eveningWarning.textContent = t[currentLang].warningEvening;
    eveningWarning.classList.remove("hidden");
    return;
  }

  eveningWarning.textContent = "";
  eveningWarning.classList.add("hidden");
}

function validateAll() {
  const results = [];
  Object.entries(fieldValidators).forEach(([name, validator]) => {
    if (validator.length > 0) {
      results.push(validator(name));
    } else {
      results.push(validator());
    }
  });
  return results.every(Boolean);
}

function openSuccessModal() {
  successMessage.classList.remove("hidden");
  successMessage.classList.add("flex");
  document.body.classList.add("overflow-hidden");
  successOkBtn.focus();
}

function closeSuccessModal() {
  successMessage.classList.add("hidden");
  successMessage.classList.remove("flex");
  document.body.classList.remove("overflow-hidden");
  form.elements.first_name.focus();
}

function getModalFocusableElements() {
  return Array.from(
    successMessage.querySelectorAll(
      "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
    )
  ).filter((el) => !el.hasAttribute("disabled") && el.getAttribute("aria-hidden") !== "true");
}

function clearFormState() {
  form.reset();
  successMessage.classList.add("hidden");
  successMessage.classList.remove("flex");
  document.body.classList.remove("overflow-hidden");
  eveningWarning.classList.add("hidden");
  eveningWarning.textContent = "";

  Object.keys(fieldValidators).forEach((name) => clearError(name));

  patientIdWrapper.classList.add("hidden");
  insuranceFields.classList.add("hidden");
  updateConcernCounter();
}

function applyDateLocale() {
  const dateOfBirthInput = form.elements.date_of_birth;
  const preferredDateInput = form.elements.preferred_date;
  const locale = currentLang === "es" ? "es-ES" : "en-US";
  const placeholder = currentLang === "es" ? "aaaa-mm-dd" : "yyyy-mm-dd";
  const title =
    currentLang === "es"
      ? "Selecciona una fecha en el calendario"
      : "Select a date from the calendar";

  [dateOfBirthInput, preferredDateInput].forEach((input) => {
    input.setAttribute("lang", locale);
    input.setAttribute("placeholder", placeholder);
    input.setAttribute("title", title);
  });
}

function applyTranslations() {
  document.documentElement.lang = currentLang;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (t[currentLang][key]) {
      el.textContent = t[currentLang][key];
    }
  });

  langButtons.forEach((btn) => {
    const isActive = btn.dataset.langBtn === currentLang;
    btn.setAttribute("aria-pressed", String(isActive));
    btn.classList.toggle("border-sky-700", isActive);
    btn.classList.toggle("text-sky-700", isActive);
    btn.classList.toggle("bg-sky-50", isActive);
  });

  updateConcernCounter();
  updateEveningWarning();
  applyDateLocale();
}

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("healthcore_lang", lang);

  const url = new URL(window.location.href);
  url.searchParams.set("lang", lang);
  window.history.replaceState({}, "", url);

  applyTranslations();

  // Re-run validation so visible messages reflect selected language.
  Object.entries(fieldValidators).forEach(([name, validator]) => {
    const hasError = !document.getElementById(`${name}_error`).classList.contains("hidden");
    if (!hasError) return;
    if (validator.length > 0) {
      validator(name);
    } else {
      validator();
    }
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const ok = validateAll();
  if (!ok) {
    successMessage.classList.add("hidden");
    successMessage.classList.remove("flex");
    document.body.classList.remove("overflow-hidden");
    return;
  }

  form.reset();
  Object.keys(fieldValidators).forEach((name) => clearError(name));
  eveningWarning.classList.add("hidden");
  eveningWarning.textContent = "";
  patientIdWrapper.classList.add("hidden");
  insuranceFields.classList.add("hidden");
  updateConcernCounter();
  openSuccessModal();
});

successOkBtn.addEventListener("click", () => {
  closeSuccessModal();
});

successMessage.addEventListener("click", (event) => {
  if (event.target === successMessage) {
    closeSuccessModal();
  }
});

document.addEventListener("keydown", (event) => {
  const modalIsOpen = !successMessage.classList.contains("hidden");
  if (!modalIsOpen) return;

  if (event.key === "Escape") {
    event.preventDefault();
    closeSuccessModal();
    return;
  }

  if (event.key === "Tab") {
    const focusable = getModalFocusableElements();
    if (focusable.length === 0) {
      event.preventDefault();
      successMessage.focus();
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement;

    if (event.shiftKey && active === first) {
      event.preventDefault();
      last.focus();
      return;
    }

    if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  }
});

clearBtn.addEventListener("click", () => {
  clearFormState();
});

["first_name", "last_name", "email", "phone", "insurance_provider", "insurance_member_id", "patient_id"].forEach((name) => {
  const input = form.elements[name];
  input.addEventListener("blur", () => fieldValidators[name](name));
  input.addEventListener("input", () => fieldValidators[name](name));
});

["preferred_language", "preferred_clinic", "preferred_time"].forEach((name) => {
  const input = form.elements[name];
  input.addEventListener("change", () => validateRequiredSelect(name));
});

form.elements.date_of_birth.addEventListener("change", () => validateDob());
form.elements.preferred_date.addEventListener("change", () => validatePreferredDate());
form.elements.service_type.addEventListener("change", () => validateService());

document.querySelectorAll("input[name='new_patient']").forEach((radio) => {
  radio.addEventListener("change", () => {
    validateNewPatient();
    validatePatientId();
  });
});

document.querySelectorAll("input[name='has_insurance']").forEach((radio) => {
  radio.addEventListener("change", () => {
    validateHasInsurance();
    validateInsuranceProvider();
    validateMemberId();
  });
});

concernField.addEventListener("input", () => {
  updateConcernCounter();
  validateHealthConcern();
});
concernField.addEventListener("blur", () => validateHealthConcern());

form.elements.contact_consent.addEventListener("change", () => validateConsent());

langButtons.forEach((btn) => {
  btn.addEventListener("click", () => setLanguage(btn.dataset.langBtn));
});

applyTranslations();
updateConcernCounter();
updatePatientIdVisibility();
updateInsuranceVisibility();
