import { h, Component } from 'preact';
import Card from 'preact-material-components/Card';
import Button from 'preact-material-components/Button';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';
import Select from 'preact-material-components/Select';
import 'preact-material-components/List/style.css';
import 'preact-material-components/Menu/style.css';
import 'preact-material-components/Select/style.css';
import style from './style';

export default class Home extends Component {
	render() {
		return (
			<div class={style.home}>
				<h1>Manage Notifications</h1>
				<Select hintText="Select a Bus Number" class={style.select}>
            		<Select.Item>opt1</Select.Item>
            		<Select.Item>opt2</Select.Item>
            		<Select.Item>opt3</Select.Item>
            		<Select.Item>opt4</Select.Item>
        		</Select>
			</div>
		);
	}
}
