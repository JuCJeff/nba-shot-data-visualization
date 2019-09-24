import React from 'react';
import _ from 'lodash';
import { ShotChart } from './ShotChart';
import { CountSlider } from './CountSlider';
import { Radio, Row, Col, Switch } from 'antd';

const RadioGroup = Radio.Group;

export class DataViewContainer extends React.Component {
  state = {
    minCount: 2,
    chartType: 'hexbin',
    displayTooltip: true
  };

  onCountSliderChange = count => {
    this.setState({ minCount: count });
  };

  onChartTypeChange = e => {
    this.setState({ chartType: e.target.value });
  };

  onTooltipChange = displayTooltip => {
    this.setState({ displayTooltip });
  };

  render() {
    return (
      <div className='data-view'>
        <ShotChart
          playerId={this.props.playerId}
          minCount={this.state.minCount}
          chartType={this.state.chartType}
          displayTooltip={this.state.displayTooltip}
        />
        <div className='filters'>
          <div className='slider'>
            {this.state.chartType === 'hexbin' ? (
              <CountSlider
                value={this.state.minCount}
                onCountSliderChange={_.debounce(this.onCountSliderChange, 500)}
              />
            ) : null}
          </div>
          <br />
          <div className='switch'>
          <Row>
            <Col span={9}>
              <RadioGroup
                onChange={this.onChartTypeChange}
                value={this.state.chartType}
              >
                <Radio value='hexbin'><span>Hexbin</span></Radio>
                <Radio value='scatter'><span>Scatter</span></Radio>
              </RadioGroup>
            </Col>
            <Col span={4}>
              <Switch
                checkedChildren='On'
                unCheckedChildren='Off'
                onChange={this.onTooltipChange}
                defaultChecked
              />
            </Col>
          </Row>
          </div>
        </div>
      </div>
    );
  }
}

export default DataViewContainer;
