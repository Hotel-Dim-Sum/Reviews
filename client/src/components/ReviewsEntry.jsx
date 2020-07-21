import React from 'react';
import moment from 'moment';
import LazyLoad from 'react-lazyload';
import styles from '../styles/style.css';
import axios from 'axios';

class ReviewsEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_image: '',
      user_name: ''
    };
    // this.handleClick = this.handleClick.bind(this);
  }

  // handleClick() {
  //   window.open(this.props.review.user_url);
  // }

  componentDidMount() {
    axios.get(`/users/${this.props.review.user_id}`)
      .then(({data}) => {
        this.setState({
          user_image: data[0]['user_image'],
          user_name: data[0]['user_name']
        });
      })
      .catch((err) => {
        console.log('react get user request error: ', err);
      });
  }

  render() {
    return (
      <LazyLoad>
        <tr className={styles.reviewCell}>
          <td>
            <div>
              <img className={styles.userImage} src={this.state.user_image} />
            </div>
            <div className={styles.reviewUser}>
              {this.state.user_name}
            </div>
            <div className={styles.reviewDate}>
              {moment(this.props.review.date).format('MMMM YYYY')}
            </div>
            <p>
              {this.props.review.text}
            </p>
          </td>
        </tr>
      </LazyLoad>
    );
  }
}

export default ReviewsEntry;
