const membershipForm = document.querySelector("[data-membership-form]");
const tierSelect = document.querySelector("#member-tier");
const formStatus = document.querySelector("[data-membership-status]");

document.querySelectorAll("[data-tier-choice]").forEach((link) => {
  link.addEventListener("click", () => {
    if (tierSelect) tierSelect.value = link.dataset.tierChoice || "";
  });
});

membershipForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!membershipForm.reportValidity()) return;

  const data = new FormData(membershipForm);
  const value = (key) => String(data.get(key) || "").trim() || "Non indiqué";
  const subject = `Demande d’adhésion à STA — ${value("name")} — ${value("tier")}`;
  const body = [
    "DEMANDE D’ADHÉSION — STAFF TURGEAU EN ACTION", "",
    `Nom complet : ${value("name")}`, `Courriel : ${value("email")}`,
    `Téléphone / WhatsApp : ${value("phone")}`, `Lieu de résidence : ${value("location")}`,
    `Niveau demandé : ${value("tier")}`, `Organisation : ${value("organization")}`,
    `Domaines d’intérêt : ${value("interests")}`, "", "DÉCLARATION DE CONTRIBUTION",
    value("statement"), "", "ATTESTATION",
    "Je comprends que STA est une organisation communautaire apolitique et à but non lucratif. Cette demande et toute cotisation ne m’autorisent pas à représenter STA sans désignation écrite expresse.",
    "", "Message généré depuis staffturgeau.org/adhesion/"
  ].join("\n");

  if (formStatus) formStatus.textContent = "Votre application de courriel va s’ouvrir. Relisez la demande avant de l’envoyer.";
  window.location.href = `mailto:Staffturgeau@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
