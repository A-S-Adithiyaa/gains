// import React, { useState, useEffect } from "react";

// function DemoVideo() {
//   const [videoUrl, setVideoUrl] = useState("");

//   useEffect(() => {
//     // fetch("http://localhost:5000/sample", {
//     //   headers: {
//     //     Accept: "video/mp4;charset=UTF-8",
//     //   },
//     //   responseType: "blob",
//     // })
//     //   .then((r) => r.blob())
//     //   .then((blob) => {
//     //     const url = URL.createObjectURL(blob);
//     //     console.log(url);
//     //     // const img = document.getElementById("img");
//     //     // img.src = url;
//     //     // // in case you don't need the blob anymore
//     //     // img.onload = (e) => URL.revokeObjectURL(url);
//     //   });
//     fetch(
//       "https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png"
//     )
//       .then((r) => r.blob()) // consume as a Blob
//       .then((blob) => {
//         const url = URL.createObjectURL(blob);
//         console.log(url);
//         const img = document.getElementById("img");
//         img.src = url;
//         // in case you don't need the blob anymore
//         img.onload = (e) => URL.revokeObjectURL(url);
//       });
//   }, []);

//   return (
//     <div>
//       <h2>Video Player</h2>
//       <img id="img" />
//       <img src="http://localhost:3000/34846852-b32c-4dff-a5c3-492605579eb5" />

//       <video controls>
//         <source src={videoUrl} type="video/mp4" />
//         Your browser does not support the video tag.
//       </video>
//     </div>
//   );
// }

// export default DemoVideo;
import React, { Component } from "react";
import axios from "axios";

class VideoPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoUrl: "",
    };
  }

  fetchVideo = () => {
    axios
      .post(
        "http://localhost:5000/generate_learn_video",
        {
          context: [
            "Cricket is a bat-and-ball game played between two teams of eleven players on a field at the centre of which is a 22-yard (20-metre) pitch with a wicket at each end, each comprising two bails balanced on three stumps",
            "Two players from the batting team (the striker and nonstriker) stand in front of either wicket, with one player from the fielding team (the bowler) bowling the ball towards the striker's wicket from the opposite end of the pitch",
          ],
        },
        {
          headers: {
            Accept: "video/mp4",
          },
          responseType: "blob",
        }
      )
      .then((response) => {
        const url = URL.createObjectURL(response.data);
        this.setState({ videoUrl: url });
      })
      .catch((error) => console.error("Error fetching video:", error));
  };

  render() {
    const { videoUrl } = this.state;
    return (
      <div>
        <h2>Video Player</h2>
        <button onClick={this.fetchVideo}>Fetch and Play Video</button>
        {videoUrl && (
          <video controls>
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>
    );
  }
}

export default VideoPlayer;
