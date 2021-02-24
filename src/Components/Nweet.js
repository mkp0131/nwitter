import React, { useState } from "react";
import { dbService } from "fbase";
import userEvent from "@testing-library/user-event";

const Nweet = ({id, nweet, creatorId, isOwner}) => {

	const [editing, setEditing] = useState(false);
	const [editNweet, setEditNweet] = useState(nweet);

	const onDeleteClick = async () => {
		const ok = window.confirm('Are you sure delete Nweet?')
		if(ok) {
			await dbService.doc(`nweets/${id}`).delete();
		}
	}

	const onEditClick = () => {
		setEditing(prev => !prev);
	}

	const onChange = (e) => {
		const {target: {value}} = e;
		setEditNweet(value);
	}

	const onSubmit = async (e) => {
		e.preventDefault();
		await dbService.doc(`nweets/${id}`).update({
			nweet: editNweet
		});
		setEditing(false);
	}

	return (
		<>
			<div>
				{editing ? (
					<>
						<form onSubmit={onSubmit}>
							<input type="text" value={editNweet} onChange={onChange}/>
							<button type="submit">edit</button>
						</form>
					</>
				) : (
					isOwner && (
						<>
							<h4>{nweet}</h4>
							<div>
								<button onClick={onDeleteClick}>Delete</button>
								<button onClick={onEditClick}>Edit</button>
							</div>
						</>
					)
				)}
			</div>
		</>
	)
}

export default Nweet;