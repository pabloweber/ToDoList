import React from 'react'
import { List, ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction, Checkbox, IconButton, TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
	item: {
		color: "white"
	}
})

export class MyList extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			checked: [],
			items: [],
			newItem: "",
		} 

		this.handleDelete = this.handleDelete.bind(this);
		this.handleAddInput = this.handleAddInput.bind(this);
		this.handleAdd = this.handleAdd.bind(this);
		// this.deleteItem = this.handleDelete.bind(this);
	}

	async componentDidMount(){
		const items = await fetch('http://localhost:9000');
		const data = await items.json();

		const newChecked = data.filter((obj) => obj.finished === true).map((obj) => {
			return obj._id;
		});

		this.setState({
			checked: newChecked,
			items: data
		})
	}

	handleToggle = (id) => () => {
		const currentIndex = this.state.checked.indexOf(id);
		const newChecked = [...this.state.checked];
	
		// Not done (add to done)
		if (currentIndex === -1) {
			this.markAsFinished(id);
		  	newChecked.push(id);
		} else {
			this.markAsNotFinished(id);
		  	newChecked.splice(currentIndex, 1);
		}
	
		this.setState({checked: newChecked});
	}

	handleDelete = (id) => () => this.deleteItem(id);

	async deleteItem(id){
		await fetch(`http://localhost:9000/${id}`, {
			method: 'DELETE'
		})

		const currentIndex = this.state.checked.indexOf(id);
		const currentItemsIndex = this.state.items.indexOf(id);
		const newChecked = [...this.state.checked];
		const newItems = [...this.state.items];

		if(currentIndex !== -1){
			newChecked.splice(currentIndex, 1);
		}
		newItems.splice(currentItemsIndex, 1);

		this.setState({
			checked: newChecked,
			items: newItems
		})
	}

	async handleAdd(){
		const res = await fetch(`http://localhost:9000`, {
			method: 'POST',
			body: JSON.stringify({
				description: this.state.newItem
			}),
			headers: {"Content-Type": "application/json"}
		})

		const item = await res.json();

		this.setState({
			items: [...this.state.items, item]
		})
	}

	handleAddInput(e){
		this.setState({
			newItem: e.target.value
		})
	}

	async markAsFinished(id){
		await fetch(`http://localhost:9000/${id}/done`, {
			method: 'PATCH'
		})
	}
	async markAsNotFinished(id){
		await fetch(`http://localhost:9000/${id}/notdone`, {
			method: 'PATCH'
		})
	}

	render(){
		const notEmpty = this.state.items.length !== 0;

		return (
			<List>
				{
					this.state.items.map((value, index) => {
						const text = this.state.items[index].description;
						const id = this.state.items[index]._id;

						return (
							<ListItem key={index} role={undefined} dense button onClick={this.handleToggle(id)}>
								<ListItemIcon>
									<Checkbox
										edge="start"
										checked={this.state.checked.indexOf(id) !== -1}
										tabIndex={-1}
										disableRipple
										style={{color: "white"}}
									/>
								</ListItemIcon>

								<ListItemText style={{color: "white"}} primary={text} />

								<ListItemSecondaryAction>
									<IconButton style={{color: "gray"}} edge="end" aria-label="comments" onClick={this.handleDelete(id)}>
										<CloseIcon />
									</IconButton>
								</ListItemSecondaryAction>
							</ListItem>
						)
					})
				}

				{/* 'Add' functionality */}
				<ListItem key={this.state.items.length + 1} role={undefined} dense button>
					<ListItemIcon>
						<IconButton style={{color: "gray"}} edge="end" aria-label="comments" onClick={this.handleAdd}>
							<AddIcon />
						</IconButton>
					</ListItemIcon>

					<TextField id="outlined-basic" label="Enter a new item" variant="outlined" style={{border: ".5px solid gray", borderRadius: "5px", color: "white"}} onChange={this.handleAddInput}/>
				</ListItem>
			</List>
		)
	}
}