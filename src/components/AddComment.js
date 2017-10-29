import React from "react";

class AddComment extends React.Component {
	constructor() {
		super();
		this.state = {
			text: ""
		};
	}

	changeText = evt => {
		this.setState({
			text: evt.target.value
		});
	};
	submitComment = () => {
		this.setState({
			text: ""
		});
	};
	render() {
		return (
			<section>
				<form onSubmit={this.submitComment}>
					<textarea onChange={this.changeText} />
				</form>
			</section>
		);
	}
}

export default AddComment;
