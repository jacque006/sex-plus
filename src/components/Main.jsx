import React from 'react';
import {
  AppBar,
  Avatar,
  Drawer,
  FlatButton
} from 'material-ui';

const PAGES = {
  MAIN: 'main'
};

export class Main extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        drawerOpen: false,
        currentPage: PAGES.MAIN
      };
    }

    toggleDrawer = () => {
      const { drawerOpen } = this.state;

      this.setState({
        drawerOpen: !drawerOpen
      });
    }

    closeDrawer = () => {
      this.setState({
        drawerOpen: false
      });
    }

    navigateTo = (page) => {
      this.setState({
        currentPage: page
      }, () => this.closeDrawer());
    }

    render() {
        const { drawerOpen, currentPage } = this.state;

        return (
          <div>
            <AppBar
              title="Sex+"
              iconElementRight={
                <Avatar style={{ cursor: 'pointer' }}>J</Avatar>}
              onLeftIconButtonTouchTap={this.toggleDrawer}
              onRightIconButtonTouchTap={() => this.navigateTo(PAGES.PROFILE)}
            />
            <Drawer
              open={drawerOpen}
              containerStyle={{'position': 'absolute', 'top': '80px'}}
            >
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  Brands
                  <FlatButton
                    label="Main"
                    onClick={() => this.navigateTo(PAGES.MAIN)}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  Settings
                  <FlatButton
                    label="My Profile"
                    onClick={() => this.navigateTo(PAGES.PROFILE)}
                  />
                </div>
              </div>
            </Drawer>
            { currentPage === PAGES.MAIN && <div /> }
            { currentPage === PAGES.PROFILE && <div /> }
          </div>
        );
    }
}
