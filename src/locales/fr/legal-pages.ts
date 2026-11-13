// Legal pages. Same keys in fr, en and pl (src/locales/parity.test.ts). Strings only.
// Identity and provider data come from src/lib/legal.data.ts; this file holds the prose around them.
export const legalPages = {
  common: {
    updated: "Dernière mise à jour",
    frenchPrevails: "La version française fait foi.",
    seeAlso: "Voir aussi",
    moreInfo: "Politique du prestataire",
    links: {
      mentions: "Mentions légales",
      privacy: "Politique de confidentialité",
      cookies: "Politique de cookies",
      terms: "Conditions d'utilisation",
    },
    label: {
      name: "Nom",
      address: "Adresse",
      email: "E-mail",
      phone: "Téléphone",
      director: "Directeur de la publication",
      siren: "SIREN",
      siret: "SIRET",
      company: "Société",
      contact: "Contact",
    },
  },
  providers: {
    ovhContact: "1007 (depuis l'étranger : +33 9 72 10 10 07)",
    label: {
      role: "Rôle",
      entity: "Entité",
      address: "Adresse",
      country: "Pays",
      transfers: "Transfert hors de l'Union européenne",
      contact: "Contact",
    },
    vercel: {
      role: "Hébergeur du site",
      country: "États-Unis",
      transfers:
        "Le DPA de Vercel est intégré à ses conditions. Il s'appuie sur les clauses contractuelles types (2021) et sur le Data Privacy Framework UE-États-Unis.",
    },
    ovh: {
      role: "Bureau d'enregistrement du nom de domaine",
      country: "France",
      transfers: "Aucun transfert hors de l'Union européenne.",
    },
    cloudflare: {
      role: "DNS et proxy devant le site",
      country: "États-Unis",
      transfers: "Data Privacy Framework ; à défaut, clauses contractuelles types.",
    },
    resend: {
      role: "Envoi des e-mails du formulaire de contact",
      country: "États-Unis",
      transfers: "Clauses contractuelles types (2021) et Data Privacy Framework.",
    },
    google: {
      role: "Google Analytics et Google Tag Manager, uniquement après votre accord",
      country: "Irlande (Google Ireland Limited), avec un transfert vers les États-Unis (Google LLC)",
      transfers:
        "Les transferts vers Google LLC reposent sur sa certification au Data Privacy Framework ; à défaut, sur les clauses contractuelles types.",
    },
    calcom: {
      role: "Prise de rendez-vous, si elle est activée",
      country: "États-Unis",
      transfers: "Clauses contractuelles types, et Data Privacy Framework tant que le prestataire en est certifié.",
    },
  },
  mentions: {
    meta: {
      title: "Mentions légales | Patrick Bartosik",
      description:
        "Éditeur, hébergeur et informations légales du site de Patrick Bartosik, développeur full stack freelance.",
    },
    title: "Mentions légales",
    intro:
      "Informations sur l'éditeur et l'hébergeur de ce site, conformément à la loi du 21 juin 2004 pour la confiance dans l'économie numérique.",
    publisher: {
      title: "Éditeur du site",
      text: "Ce site est édité par :",
    },
    host: {
      title: "Hébergeur",
      text: "Le site est hébergé par Vercel Inc. Vercel ne publie pas de numéro de téléphone : ses moyens de contact publiés sont indiqués ci-dessous.",
    },
    domain: {
      title: "Nom de domaine",
      text: "Le nom de domaine est enregistré auprès d'OVH SAS.",
    },
    network: {
      title: "Réseau et DNS",
      text: "Cloudflare assure la résolution DNS du nom de domaine et sert de proxy devant le site : les requêtes des visiteurs passent par ses serveurs avant d'atteindre l'hébergeur.",
    },
    ip: {
      title: "Propriété intellectuelle",
      text1:
        "Les textes, images, graphismes, logos, code et autres éléments du site sont, sauf mention contraire, la propriété de Patrick Bartosik ou utilisés avec l'accord de leurs titulaires.",
      text2:
        "Les marques et logos des clients et partenaires cités appartiennent à leurs propriétaires. Toute reproduction ou réutilisation, totale ou partielle, sans accord écrit préalable est interdite.",
    },
    report: {
      title: "Signaler un contenu",
      text: "Pour signaler un contenu qui vous semble illicite ou qui porte atteinte à vos droits, écrivez-moi en indiquant l'adresse de la page concernée et les raisons de votre signalement :",
    },
    data: {
      title: "Données personnelles et cookies",
      privacy: "Le traitement de vos données personnelles est décrit dans la politique de confidentialité.",
      cookies: "Les cookies et autres traceurs sont décrits dans la politique de cookies.",
    },
  },
  privacy: {
    meta: {
      title: "Politique de confidentialité | Patrick Bartosik",
      description:
        "Quelles données personnelles ce site traite, pourquoi, pendant combien de temps, avec quels prestataires, et comment exercer vos droits.",
    },
    title: "Politique de confidentialité",
    intro:
      "Cette page explique quelles données personnelles sont traitées lorsque vous utilisez ce site ou que vous me contactez, pourquoi, pendant combien de temps, qui les reçoit et comment exercer vos droits.",
    label: {
      purpose: "Finalité",
      basis: "Base légale",
      data: "Données",
      required: "Caractère obligatoire",
      scoring: "Indicateur de priorité",
      recipients: "Destinataires",
      retention: "Durée de conservation",
    },
    controller: {
      title: "Responsable du traitement",
      text: "Le responsable du traitement de vos données est Patrick Bartosik, entrepreneur individuel. Pour toute question sur vos données, écrivez à l'adresse ci-dessous.",
    },
    contact: {
      title: "Demandes de contact",
      purpose:
        "Répondre à votre demande : comprendre votre besoin, vous recontacter et, si vous le souhaitez, préparer une proposition.",
      basis:
        "Intérêt légitime à répondre aux personnes qui me contactent (article 6.1.f du RGPD). Lorsque vous demandez une proposition : mesures précontractuelles prises à votre demande (article 6.1.b).",
      data: "Parcours guidé : besoin, avancement du projet, démarrage souhaité, budget déclaré (et montant, si vous l'indiquez), message, lien éventuel, prénom, nom, adresse e-mail, société, téléphone, moyen de contact préféré, langue et, si vous la donnez, la façon dont vous m'avez connu. Message direct : nom, adresse e-mail et message. Votre adresse IP est gardée en mémoire du serveur pour limiter le nombre d'envois (cinq par heure).",
      required:
        "Pour le parcours guidé, le besoin, l'avancement, le démarrage souhaité, le budget déclaré, le message, le prénom et l'adresse e-mail sont nécessaires : sans eux, la demande ne peut pas être envoyée. Les autres champs sont facultatifs. Vous pouvez aussi m'écrire directement par e-mail.",
      scoring:
        "Un niveau de priorité (froid, tiède ou chaud) est calculé automatiquement à partir de vos réponses. Il n'apparaît que dans l'e-mail que je reçois et ne sert qu'à ordonner mes réponses.",
      recipients:
        "Moi-même. Resend, qui envoie l'e-mail de notification que je reçois et l'e-mail de confirmation qui vous est adressé.",
      retention: "Trois ans à compter du dernier contact avec vous.",
    },
    audience: {
      title: "Mesure d'audience, après votre accord",
      purpose:
        "Comprendre comment le site est consulté (pages vues, parcours, étapes du formulaire de contact) pour l'améliorer.",
      basis:
        "Votre consentement (article 6.1.a du RGPD), recueilli par le bandeau de cookies. Sans accord, rien n'est chargé. Vous pouvez le retirer à tout moment.",
      data: "Données de navigation : pages consultées, informations techniques sur votre navigateur et votre appareil, identifiants déposés par les traceurs. Si vous avez accepté, quelques événements du formulaire de contact sont aussi comptés : étape affichée, envoi de la demande, réponse à la question sur la source, clic sur la réservation. Ils ne contiennent ni votre message ni votre adresse e-mail.",
      recipients: "Google Ireland Limited (Google Analytics et Google Tag Manager).",
    },
    performance: {
      title: "Mesure de performance, sans cookie",
      purpose: "Mesurer la vitesse et la stabilité du site pour repérer les lenteurs et les corriger.",
      basis: "Intérêt légitime à maintenir un site rapide et fonctionnel (article 6.1.f du RGPD).",
      data: "Données techniques de navigation et de performance (page consultée, temps de chargement, type d'appareil). Aucun cookie n'est déposé.",
      recipients: "Vercel (Vercel Analytics et Speed Insights).",
    },
    booking: {
      title: "Prise de rendez-vous, si elle est activée",
      purpose: "Vous permettre de réserver un créneau d'échange avec moi.",
      basis: "Mesures précontractuelles prises à votre demande (article 6.1.b du RGPD).",
      data: "Les informations que vous saisissez sur la page de réservation (par exemple votre nom, votre adresse e-mail et le créneau choisi). Cette page appartient à Cal.com et suit sa propre politique de confidentialité.",
      recipients: "Cal.com, Inc., et moi-même.",
    },
    logs: {
      title: "Journaux techniques de l'hébergeur et du réseau",
      purpose: "Assurer le fonctionnement, la sécurité et la disponibilité du site.",
      basis: "Intérêt légitime à assurer la sécurité et le bon fonctionnement du site (article 6.1.f du RGPD).",
      data: "Adresse IP, date et heure de la requête, adresse demandée, informations techniques du navigateur.",
      recipients: "Vercel (hébergeur) et Cloudflare (DNS et proxy).",
    },
    processors: {
      title: "Prestataires et transferts hors de l'Union européenne",
      text: "Ces prestataires traitent des données pour mon compte. Plusieurs sont établis aux États-Unis : lorsque des données y sont transférées, le transfert repose sur le mécanisme indiqué pour chacun.",
    },
    rights: {
      title: "Vos droits",
      text: "Vous pouvez à tout moment demander :",
      access: "l'accès aux données vous concernant ;",
      rectification: "leur rectification ;",
      erasure: "leur effacement ;",
      restriction: "la limitation de leur traitement ;",
      objection: "votre opposition à un traitement fondé sur l'intérêt légitime ;",
      portability: "la portabilité des données que vous m'avez fournies, lorsque la loi le prévoit ;",
      withdrawal:
        "le retrait de votre consentement, sans effet sur ce qui a été fait avant. Pour les cookies, le bouton « Gérer les cookies » du pied de page suffit.",
      how: "Pour exercer vos droits, écrivez-moi par e-mail. Je réponds dans un délai d'un mois au plus. En cas de doute raisonnable sur votre identité, je peux vous demander un justificatif.",
    },
    complaint: {
      title: "Réclamation",
      text: "Si, après m'avoir contacté, vous estimez que vos droits ne sont pas respectés, vous pouvez saisir la Commission nationale de l'informatique et des libertés (CNIL) :",
    },
  },
  cookies: {
    meta: {
      title: "Politique de cookies | Patrick Bartosik",
      description:
        "Quels traceurs ce site utilise, à quelles conditions, et comment accepter, refuser ou modifier votre choix.",
    },
    title: "Politique de cookies",
    intro:
      "Cette page explique quels traceurs ce site peut utiliser, à quelles conditions et comment modifier votre choix. Un traceur, ou cookie, est une information enregistrée ou lue dans votre navigateur.",
    before: {
      title: "Avant votre choix",
      text: "Tant que vous n'avez pas répondu au bandeau, aucun traceur de mesure d'audience n'est déposé ni lu, et les outils Google ne sont pas chargés.",
    },
    necessary: {
      title: "Ce qui est strictement nécessaire",
      text1:
        "Votre choix lui-même est enregistré dans le stockage local de votre navigateur (accord ou refus, avec la date), pour ne pas vous poser la question à chaque page. Il reste sur votre appareil, ne sert à rien d'autre et n'est envoyé à aucun tiers.",
      text2: "La mesure de performance de Vercel (Vercel Analytics et Speed Insights) fonctionne sans cookie.",
    },
    after: {
      title: "Après votre accord",
      text1:
        "Si vous acceptez, le site charge Google Tag Manager et Google Analytics, fournis par Google Ireland Limited. Ils servent à mesurer l'audience : pages consultées, parcours, étapes du formulaire de contact.",
      text2:
        "Ils peuvent déposer des traceurs dans votre navigateur et transmettre des informations à Google, y compris vers les États-Unis. Les garanties de ce transfert sont décrites dans la politique de confidentialité.",
    },
    choice: {
      title: "Accepter ou refuser",
      text1:
        "« Accepter » et « Refuser » sont présentés avec la même simplicité. Refuser ne limite l'accès à aucune partie du site.",
      text2:
        "Votre choix, qu'il soit un accord ou un refus, est conservé six mois. Au-delà, le bandeau réapparaît.",
    },
    change: {
      title: "Modifier votre choix",
      text1:
        "Vous pouvez changer d'avis à tout moment : le bouton « Gérer les cookies » en bas de chaque page rouvre le bandeau.",
      text2:
        "Retirer votre accord arrête le chargement des outils Google. Les traceurs déjà présents dans votre navigateur peuvent y rester jusqu'à leur expiration : vous pouvez les supprimer depuis les réglages de votre navigateur.",
    },
  },
  terms: {
    meta: {
      title: "Conditions d'utilisation | Patrick Bartosik",
      description: "Conditions d'utilisation du site vitrine de Patrick Bartosik, développeur full stack freelance.",
    },
    title: "Conditions d'utilisation",
    intro:
      "Ces conditions encadrent l'utilisation de ce site. C'est un site vitrine : il ne propose ni compte utilisateur ni vente en ligne.",
    object: {
      title: "Objet du site",
      text: "Ce site présente l'activité de Patrick Bartosik, développeur full stack freelance : ses services, ses projets et un moyen de le contacter.",
    },
    access: {
      title: "Accès au site",
      text: "Le site est accessible gratuitement à toute personne disposant d'un accès à Internet. Les frais d'accès (connexion, matériel) restent à votre charge. L'accès peut être suspendu ou interrompu à tout moment, notamment pour maintenance, sans garantie de disponibilité continue.",
    },
    ip: {
      title: "Propriété intellectuelle",
      text: "Les contenus du site (textes, images, code, graphismes, logos) sont protégés. Sauf mention contraire, ils appartiennent à Patrick Bartosik ou sont utilisés avec l'accord de leurs titulaires. Toute reproduction ou réutilisation sans accord écrit préalable est interdite.",
    },
    accuracy: {
      title: "Exactitude des informations",
      text: "Je m'efforce de publier des informations exactes et à jour, mais le site peut contenir des erreurs ou des omissions. Les informations présentées (services, projets, délais) sont indicatives et ne constituent pas une offre ferme : seul un accord écrit entre nous m'engage.",
    },
    liability: {
      title: "Responsabilité",
      text: "Dans la limite permise par la loi, Patrick Bartosik n'est pas responsable des dommages résultant de l'utilisation du site ou de l'impossibilité d'y accéder. Cela ne limite pas les droits que la loi vous reconnaît.",
    },
    links: {
      title: "Liens externes",
      text: "Le site renvoie vers des sites tiers (réseaux sociaux, projets réalisés, page de réservation). Je n'en contrôle pas le contenu et ne suis pas responsable de leurs pratiques : leurs propres conditions s'appliquent.",
    },
    law: {
      title: "Droit applicable",
      text: "Ces conditions sont soumises au droit français. En cas de désaccord, écrivez-moi d'abord : nous chercherons une solution amiable.",
    },
  },
} as const;
