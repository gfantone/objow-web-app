// Account

import {Button} from "./components/Common/components/Buttons/components/Button";
import React from "react";

export const ACCOUNT_TITLE = "Mon profil"
export const ACCOUNT_FIRST_NAME_LABEL = "Prénom"
export const ACCOUNT_LAST_NAME_LABEL = "Nom"
export const ACCOUNT_EMAIL_LABEL = "Email"
export const ACCOUNT_CITATION_LABEL = "Citation"
export const ACCOUNT_PASSWORD_LABEL = "Nouveau mot de passe"
export const ACCOUNT_CONFIRM_PASSWORD_LABEL = "Confirmation du mot de passe"
export const ACCOUNT_SUBMIT_BUTTON = "Valider"

// Admin
export const ADMIN_TITLE = "Administration"

// Admin - Reward categories
export const ADMIN_REWARD_CATEGORY_LIST_SUBTITLE = "Configuration des catégories de récompenses"
export const ADMIN_REWARD_CATEGORY_LIST_ACTIVE_TAB = "Actives"
export const ADMIN_REWARD_CATEGORY_LIST_INACTIVE_TAB = "Archivées"
export const ADMIN_REWARD_CATEGORY_LIST_NAME_COLUMN = "Nom"
export const ADMIN_REWARD_CATEGORY_LIST_ICON_COLUMN = "Icône"

// Admin - Reward category creation
export const ADMIN_REWARD_CATEGORY_CREATION_SUBTITLE = "Création d'une catégorie de récompenses"
export const ADMIN_REWARD_CATEGORY_CREATION_NAME_LABEL = "Nom"
export const ADMIN_REWARD_CATEGORY_CREATION_ICON_LABEL = "Icône"
export const ADMIN_REWARD_CATEGORY_CREATION_SUBMIT_BUTTON = "Valider"

// Admin - Reward category update
export const ADMIN_REWARD_CATEGORY_UPDATE_SUBTITLE = "Modification d'une catégorie de récompenses"
export const ADMIN_REWARD_CATEGORY_UPDATE_NAME_LABEL = "Nom"
export const ADMIN_REWARD_CATEGORY_UPDATE_ICON_LABEL = "Icône"
export const ADMIN_REWARD_CATEGORY_UPDATE_SUBMIT_BUTTON = "Valider"

// Administrator collaborator selector
export const ADMINISTRATOR_COLLABORATOR_SELECTOR_EMPTY_STATE_TITLE = "Aucune équipe trouvée"
export const ADMINISTRATOR_COLLABORATOR_SELECTOR_EMPTY_STATE_MESSAGE = "Les équipes n'ont pas encore été créées"

// Collaborator reward list
export const COLLABORATOR_REWARD_LIST_COLLABORATOR_TAB = "Joueur"
export const COLLABORATOR_REWARD_LIST_TEAM_TAB = "Équipe"

// Collaborator reward order summary
export const COLLABORATOR_REWARD_ORDER_SUMMARY_TITLE = "Récapitulatif d'une commande"
export const COLLABORATOR_REWARD_ORDER_SUMMARY_REWARDS_AREA = "Commande n°{0} de {1}"
export const COLLABORATOR_REWARD_ORDER_SUMMARY_POINTS_AREA = "Total commande"
export const COLLABORATOR_REWARD_ORDER_SUMMARY_POINTS_AREA_YEAR = "Année {0}"

// Collaborator reward order tracking
export const COLLABORATOR_REWARD_ORDER_TRACKING_ID_COLUMN = "Ref"
export const COLLABORATOR_REWARD_ORDER_TRACKING_NAME_COLUMN = "Nom"
export const COLLABORATOR_REWARD_ORDER_TRACKING_EMAIL_COLUMN = "Email"
export const COLLABORATOR_REWARD_ORDER_TRACKING_TEAM_COLUMN = "Équipe"
export const COLLABORATOR_REWARD_ORDER_TRACKING_WAITING_POINTS_COLUMN = "Pts à valider"
export const COLLABORATOR_REWARD_ORDER_TRACKING_VALIDATED_POINTS_COLUMN = "Pts validés"
export const COLLABORATOR_REWARD_ORDER_TRACKING_VALUE_COLUMN = "Montant total"
export const COLLABORATOR_REWARD_ORDER_TRACKING_ORDER_DATE_COLUMN = "Date de commande"
export const COLLABORATOR_REWARD_ORDER_TRACKING_VALIDATION_DATE_COLUMN = "Date de validation"

// Collaborator reward order validation
export const COLLABORATOR_REWARD_ORDER_VALIDATION_TITLE = "Validation d'une commande"
export const COLLABORATOR_REWARD_ORDER_VALIDATION_REWARDS_AREA = "Commande n°{0} de {1}"
export const COLLABORATOR_REWARD_ORDER_VALIDATION_POINTS_AREA = "Total commande"
export const COLLABORATOR_REWARD_ORDER_VALIDATION_POINTS_AREA_YEAR = "Année {0}"

// Common
export const COMMON_EMAIL_ERROR = "L'email n'est pas valide."
export const COMMON_IS_INT_ERROR = "La valeur doit être un nombre entier."
export const COMMON_IS_MORE_THAN_OR_EQUALS_0_ERROR = "La valeur doit être supérieure ou égal à 0."
export const COMMON_MAX_LENGTH_128_ERROR = "La valeur doit faire moins de 128 caractères."
export const COMMON_PASSWORD_NOT_MATCH_ERROR = "Les mots de passe ne correspondent pas."
export const COMMON_REQUIRED_ERROR = "Ce champ est requis."

// Contact
export const CONTACT_TITLE = "Aide"
export const CONTACT_QUESTION = "Comment pouvons-nous vous aider ?"
export const CONTACT_FORM_TYPE_LABEL = "Motif"
export const CONTACT_FORM_TYPE_EVOLUTION_OPTION = "Demander une évolution"
export const CONTACT_FORM_TYPE_INCIDENT_OPTION = "Déclarer un incident"
export const CONTACT_EVOLUTION_FORM_TITLE = "Remplissez ce formulaire pour votre demande d'évolution"
export const CONTACT_EVOLUTION_FORM_MESSAGE_LABEL = "Message"
export const CONTACT_EVOLUTION_FORM_SUBMIT_BUTTON = "Envoyer"
export const CONTACT_INCIDENT_FORM_TITLE = "Remplissez ce formulaire pour votre déclaration d'indicent"

// Drawer
export const DRAWER_LEVEL_LABEL = "Level {0}"
export const DRAWER_POINTS_LABEL = "{0} PTS"
export const DRAWER_MANAGER_LABEL = "Manager"
export const DRAWER_ADMINISTRATOR_LABEL = "Administrateur"
export const DRAWER_INFOS_BUTTON = "Mes infos"
export const DRAWER_GOALS_BUTTON = "Objectifs"
export const DRAWER_CHALLENGES_BUTTON = "Challenges"
export const DRAWER_BADGES_BUTTON = "Défis"
export const DRAWER_COACHING_LIST_BUTTON = "Coaching list"
export const DRAWER_RANKINGS_BUTTON = "Classements"
export const DRAWER_TEAMS_BUTTON = "Équipes"
export const DRAWER_REWARDS_BUTTON = "Récompenses"
export const DRAWER_RULES_BUTTON = "Règles du jeu"
export const DRAWER_ADMIN_BUTTON = "Administration"
export const DRAWER_HELP_BUTTON = "Aide"
export const DRAWER_LOGOUT_BUTTON = "Déconnexion"

// Game rules
export const GAME_RULES_TITLE = "Règles du jeu"

// Goal
export const GOAL_LONG_TITLE = "Les objectifs"
export const GOAL_SHORT_TITLE = "Objectifs"
export const GOAL_YEAR_PERIOD = "Année {0}"
export const GOAL_SEMESTER_PERIOD = "Semestre {0}"
export const GOAL_QUARTER_PERIOD = "Trimestre {0} ({1})"
export const GOAL_WEEK_PERIOD = "Semaine {0} ({1})"
export const GOAL_OTHER_PERIOD = "Du {0} au {1}"
export const GOAL_COUNTER_TEXT = "Réalisé : {0}"
export const GOAL_TARGET_TEXT = "/ Objectif : {0}"
export const GOAL_TIMER_TAG = "J{0}"
export const GOAL_PROGRESSION_TEXT = "{0}%"
export const GOAL_FIRST_RANK_TEXT = "{0} er"
export const GOAL_OTHER_RANK_TEXT = "{0} ème"
export const GOAL_MAX_RANK_TEXT = "/ {0}"
export const GOAL_PLAYER_TEXT = "{0} joueurs"
export const GOAL_TEAM_TEXT = "{0} équipes"
export const GOAL_POINTS_TEXT = "{0} PTS"
export const GOAL_MAX_POINTS_TEXT = "/ {0} MAX"
export const GOAL_COLLABORATOR_TAG = "Solo"
export const GOAL_TEAM_TAG = "Équipe"

// Goal - Category filter
export const GOAL_CATEGORY_FILTER_TITLE = "Filtres"
export const GOAL_CATEGORY_FILTER_TEAM_LABEL = "Équipe"
export const GOAL_CATEGORY_FILTER_COLLABORATOR_LABEL = "Collaborateur"
export const GOAL_CATEGORY_FILTER_COLLABORATOR_ALL_OPTION = "Tous"
export const GOAL_CATEGORY_FILTER_PERIOD_LABEL = "Année"
export const GOAL_CATEGORY_FILTER_CANCEL_BUTTON = "Annuler"
export const GOAL_CATEGORY_FILTER_SUBMIT_BUTTON = "Filtrer"

// Goal - Collaborator category list
export const COLLABORATOR_GOAL_CATEGORY_LIST_TITLE = "Sélection de la catégorie"
export const COLLABORATOR_GOAL_CATEGORY_LIST_ALL_LABEL = "Toutes"

// Goal - Collaborator goal detail
export const COLLABORATOR_GOAL_DETAIL_RANK_TAB = "Classement"
export const COLLABORATOR_GOAL_DETAIL_INDICATION_TAB = "Indications"

// Goal - Collaborator goal list
export const COLLABORATOR_GOAL_LIST_EMPTY_STATE_TITLE = "Aucun objectif trouvé"
export const COLLABORATOR_GOAL_LIST_EMPTY_STATE_MESSAGE = "Si vous avez appliqué des filtres, changez-les pour afficher d'autres objectifs"

// Goal - Collaborator rank list
export const COLLABORATOR_GOAL_RANK_LIST_PLAYER_COLUMN = "Joueurs"
export const COLLABORATOR_GOAL_RANK_LIST_POINTS_COLUMN = "PTS"

// Goal - Edition
export const COLLABORATOR_GOAL_LIST_EDITION_TITLE = "Indicateurs"
export const COLLABORATOR_GOAL_LIST_EDITION_MAX_TARGET_LABEL = "Objectif alloué pour la période sélectionnée"
export const COLLABORATOR_GOAL_LIST_EDITION_ALL_TARGET_LABEL = "Objectif utilisé"
export const COLLABORATOR_GOAL_LIST_EDITION_REMAINING_TARGET_LABEL = "Objectif restant"
export const COLLABORATOR_GOAL_LIST_EDITION_EMPTY_STATE_TITLE = "Aucun objectif trouvé"
export const COLLABORATOR_GOAL_LIST_EDITION_EMPTY_STATE_MESSAGE = "Si vous avez appliqué des filtres, changez-les pour afficher d'autres objectifs"
export const COLLABORATOR_GOAL_LIST_EDITION_ERROR_TEXT = "Veuillez respecter l'objectif total alloué pour la période sélectionnée"
export const COLLABORATOR_GOAL_LIST_EDITION_SUBMIT_BUTTON = "Valider"

// Goal - Indication
export const GOAL_INDICATION_LEVEL_AREA = "Paliers"
export const GOAL_INDICATION_LEVEL_PROGRESSION_TEXT = "{0} %"
export const GOAL_INDICATION_LEVEL_POINTS_TEXT = "{0} PTS"
export const GOAL_INDICATION_DESCRIPTION_AREA = "Description"
export const GOAL_INDICATION_UNIT_WITH_SYMBOL_TEXT = "Unité : {0} ({1})"
export const GOAL_INDICATION_UNIT_WITHOUT_SYMBOL_TEXT = "Unité : {0}"
export const GOAL_INDICATION_PERIOD_TEXT = "Du {0} au {1}"
export const GOAL_INDICATION_COACHING_AREA = "Les conseils du coach"
export const GOAL_INDICATION_COACHING_EMPTY_STATE = "Aucun conseil trouvé"
export const GOAL_INDICATION_COACHING_SUBMIT_BUTTON = "Valider"

// Goal - Filter
export const GOAL_FILTER_TITLE = "Filtres"
export const GOAL_FILTER_CATEGORY_LABEL = "Catégorie"
export const GOAL_FILTER_CATEGORY_ALL_OPTION = "Toutes"
export const GOAL_FILTER_TEAM_LABEL = "Équipe"
export const GOAL_FILTER_COLLABORATOR_LABEL = "Collaborateur"
export const GOAL_FILTER_COLLABORATOR_ALL_OPTION = "Tous"
export const GOAL_FILTER_PERIOD_LABEL = "Année"
export const GOAL_FILTER_START_LABEL = "Date de début"
export const GOAL_FILTER_END_LABEL = "Date de fin"
export const GOAL_FILTER_CANCEL_BUTTON = "Annuler"
export const GOAL_FILTER_SUBMIT_BUTTON = "Filtrer"

// Goal - Team category list
export const TEAM_GOAL_CATEGORY_LIST_TITLE = "Sélection de la catégorie"
export const TEAM_GOAL_CATEGORY_LIST_ALL_LABEL = "Toutes"

// Goal - Team collaborator goal detail
export const TEAM_COLLABORATOR_GOAL_DETAIL_RANK_TAB = "Classement"
export const TEAM_COLLABORATOR_GOAL_DETAIL_INDICATION_TAB = "Indications"
export const TEAM_COLLABORATOR_GOAL_DETAIL_EDIT_TAB = "Édition"

// Goal - Team goal detail
export const TEAM_GOAL_DETAIL_RANK_TAB = "Classement"
export const TEAM_GOAL_DETAIL_INDICATION_TAB = "Indications"

// Goal - Team goal list
export const TEAM_GOAL_LIST_EMPTY_STATE_TITLE = "Aucun objectif trouvé"
export const TEAM_GOAL_LIST_EMPTY_STATE_MESSAGE = "Si vous avez appliqué des filtres, changez-les pour afficher d'autres objectifs"

// Goal - Team rank list
export const TEAM_GOAL_RANK_LIST_TEAM_COLUMN = "Équipes"
export const TEAM_GOAL_RANK_LIST_POINTS_COLUMN = "PTS"

// Main layout
export const MAIN_LAYOUT_SEARCH_PLACEHOLDER = "Rechercher..."

// Point summary
export const POINT_SUMMARY_TITLE = "Informations générales"
export const POINT_SUMMARY_POINTS_LABEL = "Total points gagnés"
export const POINT_SUMMARY_POINTS_VALUE = "{0} PTS"
export const POINT_SUMMARY_USED_POINTS_LABEL = "Total points consommés"
export const POINT_SUMMARY_USED_POINTS_VALUE = "{0} PTS"
export const POINT_SUMMARY_WAITING_POINTS_LABEL = "Points en attente de validation"
export const POINT_SUMMARY_WAITING_POINTS_VALUE = "{0} PTS"
export const POINT_SUMMARY_USABLE_POINTS_LABEL = "Solde de points"
export const POINT_SUMMARY_USABLE_POINTS_VALUE = "{0} PTS"
export const POINT_SUMMARY_ORDERS_BUTTON = "Commandes à valider"

// Reward
export const REWARD_TITLE = "Récompenses"
export const REWARD_IMAGE_INPUT_INFOS = "L’affichage de l’image s’adapte et varie en fonction de la taille de l’écran utilisé par l’utilisateur. Le format d’image recommandé pour un affichage optimal est le suivant : 1024x700."
export const REWARD_POINT_TAG = "{0} PTS"
export const REWARD_ADD_BUTTON = "Ajouter"

// Reward - Creation
export const REWARD_CREATION_SUBTITLE = "Création d'une récompense"
export const REWARD_CREATION_INFOS_AREA = "Informations"
export const REWARD_CREATION_NAME_LABEL = "Nom"
export const REWARD_CREATION_DESCRIPTION_LABEL = "Description"
export const REWARD_CREATION_EMPTY_IMAGE_TEXT = "Aucune image sélectionnée"
export const REWARD_CREATION_CATEGORY_LABEL = "Catégorie"
export const REWARD_CREATION_TYPE_LABEL = "Type"
export const REWARD_CREATION_VALUE_LABEL = "Valeur"
export const REWARD_CREATION_VALUE_SUFFIX_LABEL = "€"
export const REWARD_CREATION_POINTS_LABEL = "Nombre de points nécessaires"
export const REWARD_CREATION_IMAGE_LABEL = "Sélectionner une image..."
export const REWARD_CREATION_DELIVERY_AREA = "Livraison"
export const REWARD_CREATION_DELIVERY_PLACE_LABEL = "Lieu"
export const REWARD_CREATION_DELIVERY_MODE_LABEL = "Mode de livraison"
export const REWARD_CREATION_DELIVERY_TIME_LABEL = "Temps de livraison"
export const REWARD_CREATION_SUBMIT_BUTTON = "Valider"

// Reward - Detail
export const REWARD_DETAIL_DESCRIPTION_AREA = "Description"
export const REWARD_DETAIL_VALUE_TEXT = "Valeur : {0} €"
export const REWARD_DETAIL_DELIVERY_TITLE = "Livraison"
export const REWARD_DETAIL_DELIVERY_PLACE_TEXT = "Lieu : {0}"
export const REWARD_DETAIL_DELIVERY_MODE_TEXT = "Mode de livraison : {0}"
export const REWARD_DETAIL_DELIVERY_TIME_TEXT = "Temps de livraison estimé : {0}"
export const REWARD_DETAIL_OPERATION_TITLE = "Comment ça marche ?"
export const REWARD_DETAIL_OPERATION_STEP_1_NUMBER = "1"
export const REWARD_DETAIL_OPERATION_STEP_1_TITLE = "Au clic sur ajouter"
export const REWARD_DETAIL_OPERATION_STEP_1_DESCRIPTION = "Vous devez vérifier votre commande et valider votre panier. Une notification sera ensuite adressée à l’administrateur de votre société pour l’informer de votre demande."
export const REWARD_DETAIL_OPERATION_STEP_2_NUMBER = "2"
export const REWARD_DETAIL_OPERATION_STEP_2_TITLE = "Commande en attente"
export const REWARD_DETAIL_OPERATION_STEP_2_DESCRIPTION = "Votre commande est en attente de traitement/validation. Les points utilisés au moment de votre commande sont retirés de votre de solde de points."
export const REWARD_DETAIL_OPERATION_STEP_3_NUMBER = "3"
export const REWARD_DETAIL_OPERATION_STEP_3_TITLE = "Commande en cours"
export const REWARD_DETAIL_OPERATION_STEP_3_DESCRIPTION = "L’administrateur de votre société prend en charge votre commande. Une fois validée et facturée par le fournisseur, vos points sont définitivement décomptés de votre solde de points."
export const REWARD_DETAIL_OPERATION_STEP_4_NUMBER = "Réception"
export const REWARD_DETAIL_OPERATION_STEP_4_TITLE = "Commande expédiée"
export const REWARD_DETAIL_OPERATION_STEP_4_DESCRIPTION = "Votre récompense est en route ! Vous êtes informé par l’administrateur de votre société. Votre récompense sera déclarée et soumise à cotisations patronales et/ou salariales."

// Reward - Duplication
export const REWARD_DUPLICATION_SUBTITLE = "Duplication d'une récompense"
export const REWARD_DUPLICATION_INFOS_AREA = "Informations"
export const REWARD_DUPLICATION_NAME_LABEL = "Nom"
export const REWARD_DUPLICATION_DESCRIPTION_LABEL = "Description"
export const REWARD_DUPLICATION_EMPTY_IMAGE_TEXT = "Aucune image sélectionnée"
export const REWARD_DUPLICATION_CATEGORY_LABEL = "Catégorie"
export const REWARD_DUPLICATION_TYPE_LABEL = "Type"
export const REWARD_DUPLICATION_VALUE_LABEL = "Valeur"
export const REWARD_DUPLICATION_VALUE_SUFFIX_LABEL = "€"
export const REWARD_DUPLICATION_POINTS_LABEL = "Nombre de points nécessaires"
export const REWARD_DUPLICATION_IMAGE_LABEL = "Sélectionner une image..."
export const REWARD_DUPLICATION_DELIVERY_AREA = "Livraison"
export const REWARD_DUPLICATION_DELIVERY_PLACE_LABEL = "Lieu"
export const REWARD_DUPLICATION_DELIVERY_MODE_LABEL = "Mode de livraison"
export const REWARD_DUPLICATION_DELIVERY_TIME_LABEL = "Temps de livraison"
export const REWARD_DUPLICATION_SUBMIT_BUTTON = "Valider"

// Reward list
export const REWARD_LIST_TITLE = "Récompenses"

// Reward - Management
export const REWARD_MANAGEMENT_SUBTITLE = "Gestion des récompenses"
export const REWARD_MANAGEMENT_COLLABORATOR_TAB = "Joueurs"
export const REWARD_MANAGEMENT_COLLABORATOR_SELECTOR_AREA = "Sélection d'un joueur"
export const REWARD_MANAGEMENT_TEAM_TAB = "Équipes"
export const REWARD_MANAGEMENT_TEAM_SELECTOR_AREA = "Sélection d'une équipe"
export const REWARD_MANAGEMENT_FILTER_TITLE = "Filtres"
export const REWARD_MANAGEMENT_PERIOD_LABEL = "Année"
export const REWARD_MANAGEMENT_SUBMIT_BUTTON = "Filtrer"
export const REWARD_MANAGEMENT_CANCEL_BUTTON = "Annuler"

// Reward order item list
export const REWARD_ORDER_ITEM_LIST_QUANTITY_LABEL = "Quantité"
export const REWARD_ORDER_ITEM_LIST_VALUE_LABEL = "Valeur"
export const REWARD_ORDER_ITEM_LIST_VALUE_VALUE = "{0} €"
export const REWARD_ORDER_ITEM_LIST_POINTS_VALUE = "{0} PTS"
export const REWARD_ORDER_ITEM_LIST_EMPTY_TEXT = "Vide"
export const REWARD_ORDER_ITEM_LIST_CLOSE_BUTTON = "Continuer vos achats"

// Reward - Order list export
export const REWARD_ORDER_LIST_EXPORT_TITLE = "Export des commandes validées"
export const REWARD_ORDER_LIST_EXPORT_CATEGORY_LABEL = "Catégorie"
export const REWARD_ORDER_LIST_EXPORT_CATEGORY_ALL_OPTION = "Toutes"
export const REWARD_ORDER_LIST_EXPORT_TEAM_LABEL = "Équipe"
export const REWARD_ORDER_LIST_EXPORT_TEAM_ALL_OPTION = "Toutes"
export const REWARD_ORDER_LIST_EXPORT_COLLABORATOR_LABEL = "Collaborateur"
export const REWARD_ORDER_LIST_EXPORT_COLLABORATOR_ALL_OPTION = "Tous"
export const REWARD_ORDER_LIST_EXPORT_PERIOD_LABEL = "Année"
export const REWARD_ORDER_LIST_EXPORT_PERIOD_ALL_OPTION = "Toutes"
export const REWARD_ORDER_LIST_EXPORT_VALIDATION_START_LABEL = "Date de début"
export const REWARD_ORDER_LIST_EXPORT_VALIDATION_END_LABEL = "Date de fin"
export const REWARD_ORDER_LIST_EXPORT_SUBMIT_BUTTON = "Exporter"
export const REWARD_ORDER_LIST_EXPORT_CANCEL_BUTTON = "Annuler"

// Reward order summary
export const REWARD_ORDER_SUMMARY_RECIPIENT_POINTS_LABEL = "Solde de points actuel"
export const REWARD_ORDER_SUMMARY_RECIPIENT_POINTS_VALUE = "{0} Pts"
export const REWARD_ORDER_SUMMARY_ORDER_POINTS_LABEL = "Total commande"
export const REWARD_ORDER_SUMMARY_ORDER_POINTS_VALUE = "{0} Pts"
export const REWARD_ORDER_SUMMARY_ORDER_VALUE_LABEL = "Total valeur"
export const REWARD_ORDER_SUMMARY_ORDER_VALUE_VALUE = "{0} €"
export const REWARD_ORDER_SUMMARY_REMAINING_POINTS_LABEL = "Prochain solde de points"
export const REWARD_ORDER_SUMMARY_REMAINING_POINTS_VALUE = "{0} Pts"
export const REWARD_ORDER_SUMMARY_ORDER_BUTTON = "Commander"
export const REWARD_ORDER_SUMMARY_VALIDATE_BUTTON = "Valider"
export const REWARD_ORDER_SUMMARY_REFUSE_BUTTON = "Refuser"

export const REWARD_ORDER_SUMMARY_CONFIRM_ORDER_TITLE = "Êtes-vous sûr de vouloir valider votre commande de {0} Pts pour une valeur de {1} € ?"
export const REWARD_ORDER_SUMMARY_CONFIRM_ORDER_MESSAGE = "Une fois validée, vous ne pourrez plus annuler votre commande, les points seront retirés de votre solde de point et la valeur de votre commande sera déclarée et soumise à cotisation patronales et/ou salariales."
export const REWARD_ORDER_SUMMARY_CONFIRM_ORDER_YES_BUTTON = "Oui"
export const REWARD_ORDER_SUMMARY_CONFIRM_ORDER_NO_BUTTON = "Non"

export const REWARD_ORDER_SUMMARY_CONFIRM_VALIDATE_TITLE = "Êtes-vous sûr de vouloir valider la commande N°{0} d'un total de {1} Pts pour une valeur de {2} € ?"
export const REWARD_ORDER_SUMMARY_CONFIRM_VALIDATE_MESSAGE = "Une fois validée, vous ne pourrez plus annuler la commande, les points seront retirés du solde de points disponible et la valeur de cette commande devra être déclarée et soumise à cotisations patronales et/ou salariales."
export const REWARD_ORDER_SUMMARY_CONFIRM_VALIDATE_YES_BUTTON = "Oui"
export const REWARD_ORDER_SUMMARY_CONFIRM_VALIDATE_NO_BUTTON = "Non"
export const REWARD_ORDER_SUMMARY_CONFIRM_REFUSE_TITLE = "Êtes-vous sûr de vouloir refuser la commande N°{0} d'un total de {1} Pts pour une valeur de {2} € ?"
export const REWARD_ORDER_SUMMARY_CONFIRM_REFUSE_MESSAGE = "Une fois refusée, il ne sera plus possible de la réactiver, les points seront réattribués au solde de point disponible. Il sera de votre responsabilité d'informer l'utilisateur de la raison du refus."
export const REWARD_ORDER_SUMMARY_CONFIRM_REFUSE_YES_BUTTON = "Oui"
export const REWARD_ORDER_SUMMARY_CONFIRM_REFUSE_NO_BUTTON = "Non"

// Reward - Shopping cart
export const REWARD_SHOPPING_CART_REWARDS_AREA = "Votre panier"
export const REWARD_SHOPPING_CART_POINTS_AREA = "Total panier"
export const REWARD_SHOPPING_CART_POINTS_AREA_YEAR = "Année {0}"

// Reward - Shopping cart adding confirmation
export const REWARD_SHOPPING_CART_ADDING_CONFIRMATION_MESSAGE = 'Vous venez d’ajouter ce produit à votre panier :'
export const REWARD_SHOPPING_CART_ADDING_CONFIRMATION_SHOPPING_CART_BUTTON = 'Aller au panier'
export const REWARD_SHOPPING_CART_ADDING_CONFIRMATION_CLOSE_BUTTON = 'Continuer vos achats'

// Reward - Store filter
export const REWARD_STORE_FILTER_TITLE = "Filtres"
export const REWARD_STORE_FILTER_CATEGORY_LABEL = "Catégorie"
export const REWARD_STORE_FILTER_CATEGORY_ALL_OPTION = "Toutes"
export const REWARD_STORE_FILTER_TEAM_LABEL = "Équipe"
export const REWARD_STORE_FILTER_COLLABORATOR_LABEL = "Collaborator"
export const REWARD_STORE_FILTER_COLLABORATOR_ALL_OPTION = "Tous"
export const REWARD_STORE_FILTER_PERIOD_LABEL = "Année"
export const REWARD_STORE_FILTER_SUBMIT_BUTTON = "Filtrer"
export const REWARD_STORE_FILTER_CANCEL_BUTTON = "Annuler"

// Reward - Update
export const REWARD_UPDATE_SUBTITLE = "Modification d'une récompense"
export const REWARD_UPDATE_INFOS_AREA = "Informations"
export const REWARD_UPDATE_NAME_LABEL = "Nom"
export const REWARD_UPDATE_DESCRIPTION_LABEL = "Description"
export const REWARD_UPDATE_EMPTY_IMAGE_TEXT = "Aucune image sélectionnée"
export const REWARD_UPDATE_CATEGORY_LABEL = "Catégorie"
export const REWARD_UPDATE_TYPE_LABEL = "Type"
export const REWARD_UPDATE_VALUE_LABEL = "Valeur"
export const REWARD_UPDATE_VALUE_SUFFIX_LABEL = "€"
export const REWARD_UPDATE_POINTS_LABEL = "Nombre de points nécessaires"
export const REWARD_UPDATE_IMAGE_LABEL = "Sélectionner une image..."
export const REWARD_UPDATE_DELIVERY_AREA = "Livraison"
export const REWARD_UPDATE_DELIVERY_PLACE_LABEL = "Lieu"
export const REWARD_UPDATE_DELIVERY_MODE_LABEL = "Mode de livraison"
export const REWARD_UPDATE_DELIVERY_TIME_LABEL = "Temps de livraison"
export const REWARD_UPDATE_SUBMIT_BUTTON = "Valider"

// Team
export const TEAM_TITLE = "Équipes"
export const TEAM_COLLABORATORS_TEXT = "{0} joueurs"
export const TEAM_MANAGER_TEXT = "De {0} {1}"
export const TEAM_NO_MANAGER_TEXT = "Aucun manager"

// Team - Detail
export const TEAM_DETAIL_COLLABORATORS_TEXT = "{0} joueurs"
export const TEAM_DETAIL_MANAGER_TEXT = "De {0} {1}"
export const TEAM_DETAIL_NO_MANAGER_TEXT = "Aucun manager"
export const TEAM_DETAIL_POINTS_TEXT = "{0} PTS"
export const TEAM_DETAIL_VICTORIES_TEXT = "{0} victoires"
export const TEAM_DETAIL_EMPTY_STATE_TITLE = "Aucune équipe trouvée"

// Team - List
export const TEAM_LIST_EMPTY_STATE_TITLE = "Aucune équipe trouvée"
export const TEAM_LIST_EMPTY_STATE_MESSAGE = "Les équipes n'ont pas encore été créées"

// Team reward list
export const TEAM_REWARD_LIST_COLLABORATOR_TAB = "Équipe"
export const TEAM_REWARD_LIST_TEAM_TAB = "Joueurs"

// Team reward store
export const STORE_TEAM_COLLABORATOR_DEPARTMENT_COLLABORATOR_SELECTOR_AREA = "Sélection d'un joueur"

// Team reward order summary
export const TEAM_REWARD_ORDER_SUMMARY_TITLE = "Récapitulatif d'une commande"
export const TEAM_REWARD_ORDER_SUMMARY_REWARDS_AREA = "Commande n°{0} de {1}"
export const TEAM_REWARD_ORDER_SUMMARY_POINTS_AREA = "Total commande"
export const TEAM_REWARD_ORDER_SUMMARY_POINTS_AREA_YEAR = "Année {0}"

// Team reward order tracking
export const TEAM_REWARD_ORDER_TRACKING_ID_COLUMN = "Ref"
export const TEAM_REWARD_ORDER_TRACKING_TEAM_COLUMN = "Équipe"
export const TEAM_REWARD_ORDER_TRACKING_WAITING_POINTS_COLUMN = "Pts à valider"
export const TEAM_REWARD_ORDER_TRACKING_VALIDATED_POINTS_COLUMN = "Pts validés"
export const TEAM_REWARD_ORDER_TRACKING_VALUE_COLUMN = "Montant total"
export const TEAM_REWARD_ORDER_TRACKING_ORDER_DATE_COLUMN = "Date de commande"
export const TEAM_REWARD_ORDER_TRACKING_VALIDATION_DATE_COLUMN = "Date de validation"

// Team reward order validation
export const TEAM_REWARD_ORDER_VALIDATION_TITLE = "Validation d'une commande"
export const TEAM_REWARD_ORDER_VALIDATION_REWARDS_AREA = "Commande n°{0} de {1}"
export const TEAM_REWARD_ORDER_VALIDATION_POINTS_AREA = "Total commande"
export const TEAM_REWARD_ORDER_VALIDATION_POINTS_AREA_YEAR = "Année {0}"

// Team selector
export const TEAM_SELECTOR_EMPTY_STATE_TITLE = "Aucune équipe trouvée"
export const TEAM_SELECTOR_EMPTY_STATE_MESSAGE = "Les équipes n'ont pas encore été créées"

export const TIME_FILTER_CURRENT_TAB = "En cours"
export const TIME_FILTER_PAST_TAB = "Passés"

// Tracking sub header
export const TRACKING_SUB_HEADER_VALIDATED_TITLE = "Suivi des commandes"
export const TRACKING_SUB_HEADER_VALIDATED_TAB = "À traiter"
export const TRACKING_SUB_HEADER_WAITING_TAB = "Validées"
