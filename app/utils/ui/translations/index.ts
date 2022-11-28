import en from "./en.json";
import fr from "./fr.json";
import de from "./de.json";
import es from "./es.json";
import ru from "./ru.json";

interface TranslationKeys {
  UI_HELLO: string;
  //Common
  UI_EMAIL_I: string;
  UI_USERNAME_I: string;
  UI_PASSWORD_I: string;
  UI_CONFIRM_PASSWORD_I: string;
  UI_LOGIN_B: string;
  UI_LOGIN_OPTIONS_B: string;
  UI_SENT_CONFIRM_CODE_L: string;
  UI_ENTER_CONFIRM_CODE_I: string;
  UI_CONFIRM_B: string;
  UI_SEARCH_I: string;

  //Sign In page
  UI_SIGN_INTO_YOUR_ACCOUNT_L: string;
  UI_FORGOT_PASSWORD_B: string;
  UI_DON_HAVE_ACCOUNT_L: string;
  UI_REGISTER_B: string;

  //Forgot password page
  UI_RESET_YOUR_PASSWORD_L: string;
  UI_RESET_PASSWORD_B: string;
  UI_ALREADY_HAVE_ACCOUNT_L: string;

  //Forgot New page

  //Sign In Other Option page
  UI_LOGIN_ANOTHER_METHODS_L: string;
  UI_LOGIN_BY_EMAIL_B: string;

  //Profile page
  UI_PROFILE_L: string;
  UI_LANGUAGE_L: string;
  UI_NOTIFICATION_L: string;
  UI_PRIVACY_POLICY_L: string;
  UI_SEE_FAQ_L: string;
  UI_FEEDBACK_L: string;
  UI_WORK_INFO_L: string;

  //Language Page
  UI_ENGLISH_B: string;
  UI_SPANISH_B: string;
  UI_RUSSIAN_B: string;
  UI_FRENCH_B: string;
  UI_GERMAN_B: string;

  //Privacy Page
  PRIVACY_POLICY_CONTENT: string;

  //Feedback page
  FEEDBACK_TYPE_L: string;
  FEEDBACK_TICKET_TYPE_L: string;
  FEEDBACK_TYPE_FEEDBACK_B: string;
  FEEDBACK_TYPE_FEATURE_REQUEST_B: string;
  FEEDBACK_TYPE_ISSUE_B: string;
  FEEDBACK_WRITE_QUESTION_I: string;
  FEEDBACK_DESCRIBE_QUESTION_I: string;
  FEEDBACK_SEND_MESSAGE_B: string;
}

export { en, fr, de, es, ru, TranslationKeys };
