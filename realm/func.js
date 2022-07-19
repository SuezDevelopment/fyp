import Realm from "realm";
const app = new Realm.App({id: "caleb_src-wkhmz"}); // Set Realm app ID here.
export default app;
import { loginReducer } from "../reducer/login";
import { ActivityIndicator, Animated } from "react-native";

// import Animated from "react-native-reanimated";


const Login = props => {
  const { sendbird, onLogin } = props;
  const [state, dispatch] = useReducer(loginReducer, {
    userId: '',
    nickname: '',
    error: '',
    connecting: false,
  });

  const showErrorFadeDuration = 200;
  const showErrorDuration = 3500;

  const fade = new Animated.Value(0);


  const showError = message => {
    dispatch({ type: 'error', payload: { error: message } });
    Animated.sequence([
      Animated.timing(fade, {
        toValue: 1,
        duration: showErrorFadeDuration,
        useNativeDriver: true,
      }),
      Animated.timing(fade, {
        toValue: 0,
        delay: showErrorDuration,
        duration: showErrorFadeDuration,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const connect = () => {
    if (!state.connecting) {
      if (state.userId && state.nickname) {
        dispatch({ type: 'start-connection' });
        Keyboard.dismiss();
        sendbird.connect(state.userId, (user, err) => {
          if (!err) {
            if (user.nickname !== state.nickname) {
              sendbird.updateCurrentUserInfo(state.nickname, '', (user, err) => {
                dispatch({ type: 'end-connection' });
                if (!err) {
                  start(user);
                } else {
                  showError(err.message);
                }
              });
            } else {
              dispatch({ type: 'end-connection' });
              start(user);
            }
          } else {
            dispatch({ type: 'end-connection' });
            showError(err.message);
          }
        });
      } else {
        showError('You have not Updated your profile'); // show link to currentUser updateprofile page
      }
    }
  };

  const start = user => {
    if (onLogin) {
      onLogin(user);
    }
  };
};


// if communityCreation: send function(alert) to administrator(src)

