import React, { useEffect, useReducer, useState } from 'react';
import { StatusBar, SafeAreaView,FlatList, RefreshControl, AppState } from 'react-native';
import { View,Text } from '../Themed';
import { channelsReducer } from '../../reducer/channels';
import Community from './Community';
import { handleNotificationAction } from '../../navigation/utils';

const Communities = props => {
  const { route, navigation, handler, currentUser } = props;
  const [query, setQuery] = useState(null);
  const [state, dispatch] = useReducer(channelsReducer, {
    handler,
    currentUser,
    channels: [],
    channelMap: {},
    loading: false,
    empty: '',
    error: null,
  });

  useEffect(() => {
    handler.addConnectionHandler('channels', connectionHandler);
    handler.addChannelHandler('channels', channelHandler);
    const unsubscribe = AppState.addEventListener('change', handleStateChange);

    if (!handler.currentUser) {
      handler.connect(currentUser.userId, (_, err) => {
        if (!err) {
          refresh();
        } else {
          dispatch({
            type: 'end-loading',
            payload: {
              error: 'Connection failed. Please check the network status.',
            },
          });
        }
      });
    } else {
      refresh();
    }

    return () => {
      dispatch({ type: 'end-loading' });
      handler.removeConnectionHandler('channels');
      handler.removeChannelHandler('channels');
      unsubscribe.remove();
    };
  }, []);

  useEffect(() => {
    if (route.params && route.params.action) {
      const { action, data } = route.params;
      switch (action) {
        case 'leave':
          data.channel.leave((_, err) => {
            if (err) {
              dispatch({
                type: 'error',
                payload: {
                  error: 'Failed to leave the channel.',
                },
              });
            }
          });
          break;
      }
    }
  }, [route.params]);

  useEffect(() => {
    if (query) {
      next();
    }
  }, [query]);

  const connectionHandler = new handler.ConnectionHandler();
  connectionHandler.onReconnectStarted = () => {
    dispatch({
      type: 'error',
      payload: {
        error: 'Connecting..',
      },
    });
  };

  connectionHandler.onReconnectSucceeded = () => {
    dispatch({ type: 'error', payload: { error: null } });
    refresh();
    handleNotificationAction(navigation, handler, currentUser, 'channels').catch(err => console.error(err));
  };

  connectionHandler.onReconnectFailed = () => {
    dispatch({
      type: 'error',
      payload: {
        error: 'Connection failed. Please check the network status.',
      },
    });
  };

  const channelHandler = new handler.ChannelHandler();

  channelHandler.onUserJoined = (channel, user) => {
    if (user.userId === handler.currentUser.userId) {
      dispatch({ type: 'join-channel', payload: { channel } });
    }
  };

  channelHandler.onUserLeft = (channel, user) => {
    if (user.userId === handler.currentUser.userId) {
      dispatch({ type: 'leave-channel', payload: { channel } });
    }
  };

  channelHandler.onChannelChanged = channel => {
    dispatch({ type: 'update-channel', payload: { channel } });
  };

  channelHandler.onChannelDeleted = channel => {
    dispatch({ type: 'delete-channel', payload: { channel } });
  };

  const handleStateChange = newState => {
    if (newState === 'active') {
      handler.setForegroundState();
    } else {
      handler.setBackgroundState();
    }
  };

  const chat = channel => {
    navigation.navigate('CommunityChat', {
      channel,
      currentUser,
    });
  };
  const refresh = () => {
    setQuery(handler.GroupChannel.createMyGroupChannelListQuery());
    dispatch({ type: 'refresh' });
  };
  const next = () => {
    if (query.hasNext) {
      dispatch({ type: 'start-loading' });
      query.limit = 20;
      query.next((fetchedChannels, err) => {
        dispatch({ type: 'end-loading' });
        if (!err) {
          dispatch({
            type: 'fetch-channels',
            payload: { channels: fetchedChannels },
          });
        } else {
          dispatch({
            type: 'error',
            payload: {
              error: 'Failed to get the channels.',
            },
          });
        }
      });
    }
  };

  return(
    <>
      <StatusBar backgroundColor="#742ddd" barStyle="light-content" />
      <SafeAreaView style={style.container}>
        <FlatList
          data={state.channels}
          renderItem={({ item }) => <Community key={item.url} channel={item} onPress={channel => chat(channel)} />}
          keyExtractor={item => item.url}
          refreshControl={
            <RefreshControl refreshing={state.loading} colors={['#742ddd']} tintColor={'#742ddd'} onRefresh={refresh} />
          }
          contentContainerStyle={{ flexGrow: 1 }}
          ListHeaderComponent={
            state.error && (
              <View style={style.errorContainer}>
                <Text style={style.error}>{state.error}</Text>
              </View>
            )
          }
          ListEmptyComponent={
            <View style={style.emptyContainer}>
              <Text style={style.empty}>{state.empty}</Text>
            </View>
          }
          onEndReached={() => next()}
          onEndReachedThreshold={0.5}
        />
      </SafeAreaView>
    </>
  );
};


const style = {
  container: {
    flex: 1,
  },
  errorContainer: {
    backgroundColor: '#333',
    opacity: 0.8,
    padding: 10,
  },
  error: {
    color: '#fff',
  },
  loading: {
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  empty: {
    fontSize: 24,
    color: '#999',
    alignSelf: 'center',
  },
};

export default withAppContext(Communities);



