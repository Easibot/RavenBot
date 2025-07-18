Module.exports = {
  config: {
    name: "antispam",
    version: "1.1",
    author: "ChatGPT",
    role: 0,
    description: {
      vi: "Tự động kick người gửi tin nhắn quá dài (spam)",
      en: "Auto kick users who send overly long messages (spam)"
    },
    category: "moderation"
  },

  // 🔧 Fonction requise même si inutilisée
  onStart: async function () {
    // Ne rien faire ici
  },

  onChat: async function({ api, event, message }) {
    const { threadID, senderID, body } = event;

    // Ton UID à exclure de l'expulsion
    const EVARISTE_UID = "100093009031914"; // <-- Remplace ici par ton vrai UID

    // Longueur max d’un message autorisé
    const MAX_LENGTH = 1000;

    // Ne pas kicker si c'est toi (Evariste)
    if (senderID === EVARISTE_UID) return;

    if (body && body.length > MAX_LENGTH) {
      try {
        // Tenter d’expulser l’auteur
        api.removeUserFromGroup(senderID, threadID, (err) => {
          if (err) {
            console.error("Erreur d’expulsion :", err);
            return message.reply("❌ Impossible d’expulser le spammeur (admin ?)");
          }

          message.reply("🚫 Utilisateur expulsé pour avoir envoyé un message trop long (spam).");
        });

      } catch (err) {
        console.error("Erreur antispam :", err);
        message.reply("❌ Erreur lors du traitement du spam.");
      }
    }
  }
};
      
