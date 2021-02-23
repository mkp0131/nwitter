import { dbService } from "fbase";
import { useEffect, useState } from "react";

const Home = ({userObj}) => {
  const [nweet, setNweet] = useState('');
  const [nweets, setNweets] = useState([]);

  const onChange = (e) => {
    const {target: {value}} = e;
    setNweet(value);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    dbService.collection("nweets").add({
      nweet,
      createdAt: Date.now(),
			creatorId: userObj.uid,
    });
    setNweet('');
  }

	const getNweets = async () => {
		const dbNweets = await dbService.collection("nweets").get();
		dbNweets.forEach(item => {
			const nweetObj = {
				...item.data(),
				id: item.id,
			}
			setNweets(prev => [nweetObj, ...prev]);
		});
	}

	useEffect(() => {
		getNweets();
	}, [])

  return (
    <>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} type="text" value={nweet} placeholder="What's on your mind?" maxLength="120" />
        <button type="submit">Submit</button>
      </form>
			<div>
				{nweets.map(item => (
					<h4 key={item.id}>{item.nweet}</h4>
				))}
			</div>
    </>
  );
}

export default Home;
