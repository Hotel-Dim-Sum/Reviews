import React from 'react';
import Modal from 'react-modal';
import LazyLoad from 'react-lazyload';
import axios from 'axios';

import styles from '../styles/style.css';
import Reviews from './Reviews.jsx';
import Scores from './Scores.jsx';
import ModalReviews from './Modal/ModalReviews.jsx';

const roomId = Math.floor(Math.random() * 10000000 + 1);

Modal.setAppElement('#reviews');

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reviews: [],
      overall: 0,
      totalReviews: 0,
      cleanliness: 0,
      accuracy: 0,
      communication: 0,
      location: 0,
      checkIn: 0,
      value: 0,
      modal: false,
    };

    this.hideReviews = this.hideReviews.bind(this);
    this.showReviews = this.showReviews.bind(this);
    this.disableScroll = this.disableScroll.bind(this);
    this.enableScroll = this.enableScroll.bind(this);
  }

  componentDidMount() {
    axios.get(`/reviews/${roomId}`)
      .then(({data}) => {
        const allReviews = [];
        let cleanlinessScore = 0;
        let accuracyScore = 0;
        let communicationScore = 0;
        let locationScore = 0;
        let checkInScore = 0;
        let valueScore = 0;
        let overallScore = 0;
        const numReviews = data.length;
        for (let i = 0; i < data.length; i++) {
          const eachReview = {
            text: data[i]['review_body'],
            date: data[i]['review_date'],
            user_id: data[i]['userid'],
          };
          allReviews.push(eachReview);
          cleanlinessScore += data[i]['cleanliness_score'];
          accuracyScore += data[i]['accuracy_score'];
          communicationScore += data[i]['communication_score'];
          locationScore += data[i]['location_score'];
          checkInScore += data[i]['checkin_score'];
          valueScore += data[i]['value_score'];
          overallScore += data[i]['total_score'];
        }
        cleanlinessScore = (cleanlinessScore / numReviews).toFixed(2);
        accuracyScore = (accuracyScore / numReviews).toFixed(2);
        communicationScore = (communicationScore / numReviews).toFixed(2);
        locationScore = (locationScore / numReviews).toFixed(2);
        checkInScore = (checkInScore / numReviews).toFixed(2);
        valueScore = (valueScore / numReviews).toFixed(2);
        overallScore = (overallScore / numReviews).toFixed(2);
        this.setState({
          reviews: allReviews,
          cleanliness: cleanlinessScore,
          accuracy: accuracyScore,
          communication: communicationScore,
          location: locationScore,
          checkIn: checkInScore,
          value: valueScore,
          overall: overallScore,
          totalReviews: numReviews,
        });
      })
      .catch((err) => {
        console.log('react get request error: ', err);
      });
  }

  showReviews() {
    this.setState({
      modal: true
    });
  }

  hideReviews() {
    this.setState({
      modal: false
    });
  }

  disableScroll() {
    document.body.style.overflow = 'hidden';
  }

  enableScroll() {
    document.body.style.overflow = 'scroll';
  }

  render() {
    return (
      <div>
        <Modal
          className={styles.modalReviews}
          closeTimeoutMS={500}
          isOpen={this.state.modal}
          onRequestClose={this.hideReviews}
          onAfterOpen={this.disableScroll}
          onAfterClose={this.enableScroll}
          style={{
            overlay: {
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(18, 16, 10, 0.5)'
            },
            content: {
              position: 'absolute',
              top: '40px',
              left: '40px',
              right: '40px',
              bottom: '40px',
              border: '1px solid #ccc',
              background: '#fff',
              overflow: 'auto',
              WebkitOverflowScrolling: 'touch',
              borderRadius: '10px',
              outline: 'none',
              padding: '20px'
            }
          }}
        >
          <ModalReviews
            reviews={this.state.reviews}
            hideModal={this.hideReviews}
            overall={this.state.overall}
            totalReviews={this.state.totalReviews}
            cleanliness={this.state.cleanliness}
            accuracy={this.state.accuracy}
            communication={this.state.communication}
            location={this.state.location}
            checkIn={this.state.checkIn}
            value={this.state.value}
          />
        </Modal>
        <h3 className={styles.overview}>
          <span className={styles.star}>★</span>{this.state.overall} <span>({this.state.totalReviews} reviews)</span>
        </h3>
        <table className={styles.scoresTable}>
          <LazyLoad>
            <Scores
              cleanliness={this.state.cleanliness}
              accuracy={this.state.accuracy}
              communication={this.state.communication}
              location={this.state.location}
              checkIn={this.state.checkIn}
              value={this.state.value}
            />
          </LazyLoad>
        </table>
        <table>
          <LazyLoad>
            <Reviews reviews={this.state.reviews} totalReviews={this.state.totalReviews} />
          </LazyLoad>
        </table>
        <div>
          <button className={styles.reviewsButton} type="button" onClick={this.showReviews}> Show all {this.state.totalReviews} reviews </button>
        </div>
      </div>
    );
  }
}

export default App;
