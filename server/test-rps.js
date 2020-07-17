import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  // vus: 1200,
  // duration: '3m',
  stages: [
    { duration: '1s', target: 100 },
    { duration: '5s', target: 1000 },
    { duration: '3m', target: 1500 },
    { duration: '5s', target: 2000 },
    { duration: '1m', target: 2000 },
  ],
};

export default function() {
  const id = Math.floor(Math.random() * 10000000) + 1;
  let res = http.get(`http://localhost:3002/reviews/${id}`);
  check(res, { 'status was 200': r => r.status === 200 });
  sleep(1);
};
