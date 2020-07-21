/* eslint-disable max-len */
import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import LazyLoad from 'react-lazyload';

import ModalReviewsEntry from './ModalReviewsEntry.jsx';
import ModalScores from './ModalScores.jsx';
import styles from '../../styles/style.css';
import Parser from '../Parser.js';

class ModalReviews extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    //   reviews: [],
      pageNumber: 3
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
  //   Parser.getAllReviews(this.props.roomId, 1, (data1) => {
  //     Parser.getAllReviews(this.props.roomId, 2, (data2) => {
  //       this.setState({
  //         reviews: [...this.state.reviews, ...data1, ...data2]
  //       });
  //     });
  //   });

    document.addEventListener('scroll', this.handleScroll, true);
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScroll, true);
  }

  handleClick() {
    this.props.hideModal();
  }

  handleScroll(e) {
    const elem = e.target;
    // console.log(elem.scrollHeight - elem.scrollTop, elem.clientHeight);
    if (elem.scrollHeight - elem.scrollTop <= elem.clientHeight + 10) {
      // Parser.getAllReviews(this.props.roomId, this.state.pageNumber, (data) => {
        this.setState({
          pageNumber: this.state.pageNumber + 1,
          // reviews: [...this.state.reviews, ...data]
        });
      // });
    }
  }

  render() {
    return (
      <div>
        {/* CLOSE MODAL BUTTON */}
        <header className={styles.modalHeader}>
          <div>
            <button className={styles.modalBtn} type="button" onClick={this.handleClick}> × </button>
          </div>
        </header>
        {/* OVERALL SCORE */}
        <div className={styles.modalOverview}>
          <span className={styles.modalStar}>★</span>{this.props.overall} <span>({this.props.totalReviews} reviews)</span>
        </div>
        {/* REVIEWS LIST */}

        <div>
          <table className={styles.modalTable}>
            <tbody>
              <LazyLoad>
                {this.props.reviews.map((review, i) => (
                  <ModalReviewsEntry review={review} key={i} />
                ))}
              </LazyLoad>
            </tbody>
          </table>
        </div>

        <div>
          <LazyLoad>
            <ModalScores
              cleanliness={this.props.cleanliness}
              accuracy={this.props.accuracy}
              communication={this.props.communication}
              location={this.props.location}
              checkIn={this.props.checkIn}
              value={this.props.value}
            />
          </LazyLoad>
        </div>

      </div>
    );
  }
}
export default ModalReviews;
