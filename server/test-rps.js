import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  stages: [
    { duration: '1s', target: 100 },
    { duration: '1m', target: 1000 },
    { duration: '1m', target: 1500 },
    { duration: '10s', target: 0 },
  ],
};

export default function () {
  const id = Math.floor(Math.random() * 10000000) + 1;
  http.get(`http://localhost:3002/reviews/${id}`);
  sleep(1);
}
