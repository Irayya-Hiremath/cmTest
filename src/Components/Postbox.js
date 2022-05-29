import React from 'react'
import { Button,Row,Card,Container,Form,Accordion } from 'react-bootstrap';
import Layout from './Layout'
import { FaMarker,FaRegImage,FaVideo,FaUserTag,FaMapMarkerAlt,FaCalendarCheck} from 'react-icons/fa';
import { AiOutlineGif} from "react-icons/ai";
import { useState } from 'react';
import Newsfeed from './Newsfeed';


function Postbox() {

  const storyDetails ={
    msg:"",
    images:""

  };

  const [title, setTitle] = useState('')
  const [story, setStory] = useState(storyDetails) 
  const [gif, setGif] = useState([])
  const [show,setShow]=useState(false)
  const [input,setInput]=useState(false)
  const [post, setPost]=useState([])


function readTitle(value){
    setTitle(value);
    console.log(value)
    getGifs()
}


function getGifs(){

  
  fetch(`https://api.giphy.com/v1/stickers/search?api_key=WKV3JMNqZBzRJe8gu8jqEYuFbRR8S5Iv&q=${title}&limit=5&offset=&rating=g&lang=en`)
    .then((response)=>response.json())
    .then((result)=>{
        setGif(result.data.map((gifs)=>{
          return gifs.images.fixed_height.url

        }));
        setShow(true)
        console.log(result)
    })
    .catch((err)=>{
        console.log(err)
    })
}


function postdata(e){
  setPost([story,...post])

  setStory(storyDetails)
  setInput(false)
}

  return (
    <Layout >
      <Container className='my-2'>
              <Row className='m-auto'>
                  <Card className='Post_box col-lg-6 col-12 m-auto px-4 py-1 border border-radius-5'>
                      <div className='button_box row d-flex d-flex justify-content-between'>
                        <Button className='col-4 ml-1'> <FaMarker/>Compose Post</Button>
                        <Button className='col-3 ml-1'> <FaRegImage/>Photo/Video</Button>
                        <Button className='col-4 ml-1'> <FaVideo/>Live Video</Button>
                      </div>
                      
                      <Card.Body>
                        <div className="w-100 d-flex">
                          <Form.Group  className='col-lg-8 col-6  d-flex' controlId="validationCustom01">
                          <img src="./fb.png" width='15%' alt="" />
                                <Form.Control
                                      required
                                      type="text"

                                      className='input'

                                      name='msg'
                                      value={story.msg}
                                      placeholder='Write Something Here...'

                                      onChange={(e)=>{
                                          setStory({...story, msg:e.target.value})
                                      }}
                                  />
                          </Form.Group>
                        </div>

                        <p> <img src={story.images} alt="" /></p> 

                          <Row className='d-flex justify-content-between m-2'>
                              <Button className='col-5 p-1 my-2 ' > <FaUserTag/>Tag Friends</Button>
                              <Button className='col-5 p-1 my-2 ' > <FaMapMarkerAlt/>Check in</Button>

                              <Accordion onClick={()=>{setInput(true)}}   className='col-5 p-1 my-1 ' defaultActiveKey="1">
                                <Accordion.Item eventKey='0'>
                                  <Accordion.Header ><AiOutlineGif/> GIF</Accordion.Header>
                                    {input? <Accordion.Body>
                                    <input  className='w-100' type="text" placeholder='search Gif'
                                    onChange={(event)=>{readTitle(event.target.value)}}/>
                                    {show? <div style={{width:"100%",height:'150px',overflow:'scroll'}}>

                                    {gif.map((giff)=>{
                                      return(
                                      <p onClick={()=>{setStory({...story,images:giff});setShow(false);setInput(false)}}><img src={giff} width='100%' alt="" /></p>
                                    )

                                    })} 
                                  </div> :null}
                                  </Accordion.Body>:null}
                                </Accordion.Item>
                            </Accordion>
                            <Button  className='col-5 p-1 my-2 ' ><FaCalendarCheck/>Tag Event</Button>
                      </Row>
                          
                      </Card.Body>

                      <Button  className='py-1 postButton' type='submit' onClick={postdata}>Post</Button>
                  </Card>
              </Row>
       </Container>
        <div className='m-auto cards_box'>
          <Newsfeed post={post}/>
        </div>

  </Layout>


  )}
export default Postbox;