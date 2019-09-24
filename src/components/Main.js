import React from 'react';
import nba from 'nba';

import Profile from './Profile';
import DataViewContainer from './DataViewCountainer';

export class Main extends React.Component {
  state = {
    playerInfo: {
      playerId: nba.findPlayer('Paul George').playerId,
      teamAbbreviation: 'LAC'
    }
  };

  componentDidMount() {
    nba.stats
      .playerInfo({ PlayerID: nba.findPlayer('Paul George').playerId })
      .then(info => {
        console.log(info);
        const playerInfo = Object.assign(
          info.commonPlayerInfo[0],
          info.playerHeadlineStats[0]
        );
        console.log(playerInfo);
        this.setState({ playerInfo });
      });
  }

  render() {
    return (
      <div className='main'>
        <Profile playerInfo={this.state.playerInfo} />
        <DataViewContainer playerId={this.state.playerInfo.playerId} />
      </div>
    );
  }
}

export default Main;
