import React, { useEffect, useState, Component } from 'react'
import { List, Avatar, Row, Col, Button } from 'antd';
import axios from 'axios';
import SideVideo from './Sections/SideVideo';
import Subscriber from './Sections/Subscriber';
import Comments from './Sections/Comments'
import LikeDislikes2 from './Sections/LikeDislikes2';
import Time from './Sections/Time';

function DetailVideoPage(props) {
    const videoId = props.match.params.videoId
    const [Video, setVideo] = useState([])
    const [CommentLists, setCommentLists] = useState([])
    const [playtime, setPlaytime] = useState(0)
    const videoVariable = {
        videoId: videoId
    }
    useEffect(() => {
        axios.post('/api/video/getVideo', videoVariable)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.video)
                    setVideo(response.data.video)
                } else {
                    alert('Failed to get video Info')
                }
            })

        axios.post('/api/comment/getComments', videoVariable)
            .then(response => {
                if (response.data.success) {
                    console.log('response.data.comments',response.data.comments)
                    setCommentLists(response.data.comments)
                } else {
                    alert('Failed to get video Info')
                }
            })
    }, [])

    const updateComment = (newComment) => {
        setCommentLists(CommentLists.concat(newComment))
    }

    
    
    if (Video.writer) {
        return (
            <Row>
                <Col lg={18} xs={24}>
                    <div className="postPage" style={{ width: '100%', padding: '3rem 4em' }}>
                        <video  style={{ width: '100%' }} src={`http://localhost:5000/${Video.filePath}`} controls autoPlay="true" ></video>
                        

                        <List.Item
                            actions={[<LikeDislikes2 video videoId={videoId} userId={localStorage.getItem('userId')}  />, <Subscriber userTo={Video.writer._id} userFrom={localStorage.getItem('userId')} />]}
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={Video.writer && Video.writer.image} />}
                                title={Video.title}
                                description={Video.description}
                            />
                            <div></div>
                        </List.Item>

                        

                    </div>
                    <div className="sidevideo" style={{ width: '50%', padding: '3rem 4em' }}>
                        <SideVideo />
                    </div>
                </Col>
                <Col lg={5} xs={24}>
                    <Comments CommentLists={CommentLists} postId={Video._id} refreshFunction={updateComment} /> 
                </Col>
            </Row>
        )

    } else {
        return (
            <div>Loading...</div>
        )
    }


}
export default DetailVideoPage

