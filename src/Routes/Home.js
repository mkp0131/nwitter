import { dbService } from "fbase";
import { useEffect, useState } from "react";
import Nweet from "Components/Nweet";

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


	useEffect(() => {
    dbService.collection('nweets').onSnapshot(snapshot => {
      const nweetArr = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));
      setNweets(nweetArr)
    })
	}, [])

  return (
    <>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} type="text" value={nweet} placeholder="What's on your mind?" maxLength="120" />
        <button type="submit">Submit</button>
      </form>
			<div>
				{nweets.map(item => (
					<Nweet key={item.id} id={item.id} nweet={item.nweet} creatorId={item.creatorId} isOwner={item.creatorId===userObj.uid} />
				))}
			</div>
    </>
  );
}

export default Home;
