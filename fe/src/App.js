import React from 'react';
import { Container, List, Card, FormHelperText } from '@material-ui/core';
import { MyList } from './List.js'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
	app: {
		backgroundColor: "#212121",
		color: "white",
		height: "100%"
	},
	container: {
		backgroundColor: "#212121",
		color: "white",
		height: "100%",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		
	},
	card: {
		backgroundColor: "#424242",
	},
})

function App() {
	const classes = useStyles();

	return (
		<div className={classes.app}>
			<Container className={classes.container} maxWidth="sm">
				<Card className={classes.card}>
					<Container maxWidth="sm">
						<MyList />
					</Container>
				</Card>
			</Container>
		</div>
	);
}

export default App;
