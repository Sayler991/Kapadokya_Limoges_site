# Kapadokya kebab — Limoges · site de démonstration + tableau de bord

Maquette réalisée par Younes (web designer). **Site non officiel** (« Maquette de démonstration »), à faire valider par l’établissement.

- Site : https://sayler991.github.io/Kapadokya_Limoges_site/
- Espace gérant : https://sayler991.github.io/Kapadokya_Limoges_site/admin/ (propriétaire : table partagée `public.owners`, compte benduy0@gmail.com)
- Hébergement : GitHub Pages (Netlify non connecté sur la machine ; `netlify.toml` prêt pour un déploiement ultérieur, site « kapadokya-limoges »).

## Faits réels (relevés le 17/10/2026)
- Adresse : 73 av. du Général Leclerc, 87100 Limoges (plus code R7V5+MR, GPS 45.844162, 1.259552) — Google Maps, exa.ai, Restaurant Guru.
- Téléphone : 05 87 21 83 61 (fixe → bouton « Appeler », pas de WhatsApp).
- Notes : Google 4,7/5 (397 avis), Facebook 4,8/5 (19 avis) — Restaurant Guru / Google Maps.
- Horaires (Google / Restaurant Guru) : lundi fermé ; mar–jeu, sam, dim 11:30–14:30 et 17:30–22:00 ; vendredi 11:30–15:00 et 17:30–22:00. Le flyer indique « du mardi au dimanche 11h30–15h00 et 17h30–22h00 » (signalé sur le site).
- Services (Restaurant Guru) : livraison, à emporter, réservation, cartes bancaires.
- Carte (flyer non daté, prix confirmés par le client) : Sandwichs-frites — Kebab-frites, Pita-frites, Kefta-frites, Poulet-frites, Américain-frites, Panini-frites : 5,50 € chacun, boisson + 1 €.
- Avis cités mot pour mot : Sabine (Google, mai 2026), Igor (Google, février 2026), Arthur Castanie (Google, ~sept. 2026), Karen (Restaurant Guru, ~2024).

## Provisoire / à confirmer
- Logo : recréation SVG provisoire (flamme or + « KAPADOKYA »), le logo officiel (carte de visite / flyer) est trop petit pour être réutilisé.
- Livraison : zone, délai et frais à confirmer au téléphone (aucun frais inventé).
- Textes d’accroche : rédaction de la maquette.

## Photos
**Photos réelles** (fiche Restaurant Guru de Kapadokya kebab Limoges, filigrane mascotte retiré par recadrage, contenu non retouché) :
| fichier site | source |
|---|---|
| r-sandwich (accueil) | rg_25 |
| r-facade | rg_33 |
| r-broche | rg_59 (bas de la photo) |
| r-kebab | rg_11 |
| r-assiette | rg_16 |
| r-kefta | rg_37 |
| r-salle | rg_32 |
| r-comptoir | rg_54 |
| galette (cartes Pita-frites, Panini-frites + galerie) | rg_49 (partie droite : galette grillée et frites ; mascotte hors cadre) — remplace depuis la v3 l’illustration Pexels 17200357 |

**Illustrations — licence Pexels** (usage libre, attribution facultative), légendées « Illustration » :
| clé | auteur | lien |
|---|---|---|
| assiette (Américain-frites) | Shawkat Galib | https://www.pexels.com/photo/doner-fries-and-pide-behind-15202777/ |
| frites | Vinícius Caricatte | https://www.pexels.com/photo/close-up-photo-of-french-fries-on-white-paper-12946719/ |
| kebab (Poulet-frites) | Valeria Boltneva | https://www.pexels.com/photo/doner-with-meat-and-vegetables-18330009/ |
| boissons | Leonid Altman | https://www.pexels.com/photo/condensation-on-aluminium-cans-5121657/ |
| hero/spit/kefta (en réserve, non affichées) | Ezginur Varlı / Valeria Boltneva / HACI HÜSEYİN EROL | pexels 24981551, 27668662, 35366590 |
Polices : Bricolage Grotesque + DM Sans (SIL OFL), auto-hébergées.

## Commande en ligne
+ / − sur chaque carte (vol vers le panier), panier collant (ordinateur) / barre flottante (mobile), tiroir avec remarque par article, à emporter ou livraison (Limoges et alentours), envoi → `kapadokya.place_order` (Supabase, prix recalculés côté serveur en centimes depuis la carte publiée, pot de miel, limites de débit) → numéro de commande. Un article sans prix reste commandable en « demande » (total confirmé au téléphone).

## Supabase (projet rvreusugrtiubqtafgbk, schéma `kapadokya`)
`supabase/schema.sql` puis `supabase/seed.sql` ; schéma ajouté aux schémas exposés (liste existante conservée). Admin : commandes (nouvelle / en préparation / prête / livrée / annulée) + alertes temps réel (son, notification, relève 30 s), clients, stats, contenu, carte & prix (format 8,50), horaires, photos, historique.
Test : `node tools/e2e.js <URL> <dossier>` (crée des commandes « TEST E2E » à supprimer ensuite).
