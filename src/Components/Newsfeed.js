import React from "react";
import { Card } from "react-bootstrap";

function Newsfeed({ post }) {
  var getDate = new Date()
  var sDate=getDate.toDateString()
  return (
   
    <> 
      {post.map((data) => {
        return (
          <Card className="col-5" style={{ margin:"auto",marginTop:"1rem" }}>
            <Card.Body>
             <div className="d-flex">
                  <img src="./fb.png" width='50px' height='50px'  alt="" />
                  <Card.Title className="py-3">  
                  Rocky <br/>
                  <Card.Subtitle className="mb-2 text-muted"><span>{sDate}</span></Card.Subtitle>
                  </Card.Title>
             </div>
             
              <Card.Text className="mx-5">
              {data.msg}
              </Card.Text>
              <img src={data.images} width='20%' height='10%' alt="gifs" style={{marginLeft:'40%'}} />

            </Card.Body>
          </Card>
        );
      })}
    </> 
   

  );
}

export default Newsfeed;
