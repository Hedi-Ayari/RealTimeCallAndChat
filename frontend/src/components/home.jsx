import { QueryClient, QueryClientProvider, useQueryClient, useQuery } from '@tanstack/react-query'
import React, { useState, useEffect, useRef } from 'react';


import { Peer } from "peerjs";

const queryClient = new QueryClient()

export default function Main() {

  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  )
}


function Example() {
  //I didn't notice I declared too much here xD never mind about them I 'm just testing peer js 
  const [id1, setId1] = useState();
  const [peer, setPeer] = useState();
  const [hasId, SetHasId] = useState(false);
  const [PeerToCall, setPeerToCall] = useState("");
  const [answerCall, SetAnswerCall] = useState();
  const [isDislpay, SetIsDislpay] = useState(false);
  const [connnn, setPeerConn] = useState();
  const [ideCont, SetContent] = useState("");
  const videoRef = useRef(null);
  const [connec, setConn] = useState();
  const [newIDE, setIdeNew] = useState("");
  const [CannStream, SetCannStream] = useState();
  const [stream, SetStream] = useState();

  //----------------------------------------------
  //He will create new peer here and use peer server 
  if (!hasId) {
    const myPeer = new Peer(undefined, {
    })
    setPeer(myPeer)
    SetHasId(true)
  }
  //-------------------------------------------------
  //here I created a connection between 2 peers 
  const call = () => {
    const conn = peer.connect(PeerToCall);
    const conn2 = peer.call(PeerToCall, stream);
    SetCannStream(conn2);
    setConn(conn);

  }
  //-------------------------
  useEffect(() => {
    if (connec) {
      connec.send(ideCont)
      connec.on("data", (data) => {
        console.log(data);
        setIdeNew(data);
      });
    }
  }, [ideCont]);
  useEffect(() => {


    document.getElementById("zzzz").value = newIDE;


  }, [newIDE]);
  useEffect(() => {
    if (connnn) {
      console.log("fama connection fel peer")
      connnn.send(ideCont)


    }
  }, [ideCont]);



  //------------------hedhi bch ykhou biha el stream 
  
  const openCamera = () => {
    navigator.mediaDevices
      .getUserMedia({ video: { width: 300 }, audio: false })
      .then(stream => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
        SetStream(stream)
      })
      .catch(err => {
        console.error("error:", err);
      });

  }

  //--------------------------------------
  //---------------lahne bch ihandli el textarea

  const handleChange = (e) => {
    SetContent(e.target.value);
  }

  //-----------------------------------------lahne el khedma taa el call
  if (CannStream) {
    console.log("el had el en cv")
    CannStream.on("stream", (remoteStream) => {

      if (remoteStream) {
        document.getElementById("local-video").srcObject = remoteStream;
        document.getElementById("local-video").play();
      }
    });

  }

  //-------------------------------------------


  if (peer) {


    peer.on('open', (id) => {
      setId1(id);
      console.log('My peer ID is: ' + id);
      console.log(peer);
    });
    peer.on("connection", (conn) => {
      setPeerConn(conn)
      conn.on("data", (data) => {

        console.log(data);
        document.getElementById("zzzz").value = data;
      });
      conn.on("open", () => {
        conn.send("hello!");
      });
    });
    peer.on('call', (call) => {
      console.log("fama call")
      //*call.answer = true
      const answerCall = true;

      // stream.answer(stream)
      if (answerCall) {
        call.answer(stream) // A

        call.on('stream', (stream) => { // C

          console.log(stream);
          if (stream) {

            console.log(window)
            document.getElementById("local-video").srcObject = stream;
            document.getElementById("local-video").play();
            window.localStream = stream; // A
            window.localAudio.srcObject = stream; // B
            window.localAudio.autoplay = true;

          }


        });
      } else {
        console.log("call denied"); // D
      }
    });






    return (
      <div>
        <h3>my id: {id1}</h3>
        <input name="firstName" className='form-control' placeholder="d4f7fa71-bda8-421c-b9d3-d5d33c50c8db" onChange={e => setPeerToCall(e.target.value)}></input>
        <button onClick={() => { openCamera() }}>Open Camera</button>
        <button onClick={() => { call() }}>Call</button>
        <p>{isDislpay}</p>
     
        <video ref={videoRef} />
        <video id="local-video" muted={false}></video>
        <video id="local-video1" muted={false}></video>
        <div className="form-group">
          <label htmlFor="exampleFormControlTextarea1">chat</label>
          <textarea className="form-control" id="zzzz" onChange={(e) => { handleChange(e) }} rows={3} defaultValue={""} />
        </div>
      </div>

    )







  }





}
