import { dbService } from "fbase";
import { useState } from "react";

function Home() {
  const [nweet, setNweet] = useState('');

  const onChange = (e) => {
    const {target: {value}} = e;
    setNweet(value);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    dbService.collection("nweets").add({
      nweet,
      createdAt: Date.now()
    });
    setNweet('');
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} type="text" value={nweet} placeholder="What's on your mind?" maxLength="120" />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default Home;
