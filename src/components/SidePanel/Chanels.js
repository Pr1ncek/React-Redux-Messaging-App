import React from 'react';
import { Menu, Icon, Modal, Form, Input, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { setCurrentChannel } from '../../actions';

class Chanels extends React.Component {
  state = {
    channels: [],
    modal: false,
    channelName: '',
    channelDetails: '',
    channelsRef: firebase.database().ref('channels'),
    activeChannelId: '',
    firstLoad: true
  };

  componentDidMount() {
    this.addListeners();
  }

  componentWillMount() {
    this.removeListeners();
  }

  removeListeners = () => {
    this.state.channelsRef.off();
  };

  addListeners = () => {
    let loadedChannels = [];
    this.state.channelsRef.on('child_added', snap => {
      loadedChannels.push(snap.val());
      this.setState({ channels: loadedChannels }, () => this.setFirstChannel());
    });
  };

  setFirstChannel = () => {
    const { firstLoad, channels } = this.state;
    if (firstLoad && channels.length > 0) {
      this.props.setCurrentChannel(channels[0]);
      this.setActiveChannel(channels[0]);
    }
    this.setState({ firstLoad: false });
  };

  openModal = () => {
    this.setState({ modal: true });
  };

  closeModal = () => {
    this.setState({ modal: false });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.isFormValid(this.state)) {
      this.addChannel();
    }
  };

  addChannel = () => {
    const { channelsRef, channelName, channelDetails } = this.state;
    const { displayName = '', photoURL = '' } = this.props.currentUser;
    const key = channelsRef.push().key;
    const newChannel = {
      id: key,
      name: channelName,
      details: channelDetails,
      createdBy: {
        name: displayName,
        avatar: photoURL
      }
    };
    console.log(newChannel);
    channelsRef
      .child(key)
      .update(newChannel)
      .then(() => {
        this.setState({ channelName: '', channelDetails: '' });
        this.closeModal();
        console.log('Channel Added');
      })
      .catch(err => console.error(err));
  };

  isFormValid = ({ channelName, channelDetails }) => {
    return channelName && channelDetails;
  };

  displayChannels = channels =>
    channels.length > 0 &&
    channels.map(channel => (
      <Menu.Item
        key={channel.id}
        onClick={() => this.changeChannel(channel)}
        name={channel.name}
        style={{ opacity: 0.7 }}
        active={channel.id === this.state.activeChannelId}
      >
        # {channel.name}
      </Menu.Item>
    ));

  changeChannel = channel => {
    this.setActiveChannel(channel);
    this.props.setCurrentChannel(channel);
  };

  setActiveChannel = channel => {
    this.setState({ activeChannelId: channel.id });
  };

  render() {
    const { channels, modal } = this.state;
    return (
      <React.Fragment>
        <Menu.Menu style={{ paddingBottom: '2em' }}>
          <Menu.Item>
            <span>
              <Icon name="exchange" /> CHANNELS
            </span>{' '}
            ({channels.length}) <Icon name="add" onClick={this.openModal} />
          </Menu.Item>
          {/* Channels */}
          {this.displayChannels(channels)}
        </Menu.Menu>

        {/* Add Channel Modal */}
        <Modal open={modal} onClose={this.closeModal} basic size="tiny">
          <Modal.Header style={{ paddingBottom: 0, textAlign: 'center' }}>
            Add New Channel
          </Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.handleSubmit}>
              <Input
                style={{ paddingBottom: '0.5em' }}
                fluid
                name="channelName"
                placeholder="Name of Channel"
                onChange={this.handleChange}
              />

              <Input
                fluid
                name="channelDetails"
                placeholder="About the Channel"
                onChange={this.handleChange}
              />
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button color="green" inverted onClick={this.handleSubmit}>
              <Icon name="checkmark" /> Add
            </Button>
            <Button color="red" inverted onClick={this.closeModal}>
              <Icon name="remove" /> Cancel
            </Button>
          </Modal.Actions>
        </Modal>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
});

export default connect(
  mapStateToProps,
  { setCurrentChannel }
)(Chanels);
