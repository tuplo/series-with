# series-with

<p>
  <img src="https://img.shields.io/npm/v/@tuplo/series-with">
  <a href="https://codecov.io/gh/tuplo/series-with">
    <img src="https://codecov.io/gh/tuplo/series-with/branch/main/graph/badge.svg?token=82MK1TBX2I"/>
  </a>
  <img src="https://github.com/tuplo/series-with/workflows/Build/badge.svg">
  <img src="https://david-dm.org/tuplo/series-with.svg">
</p>

> Sequentially applies an asynchronous function to an array

## Usage

```typescript
import seriesWith from '@tuplo/series-with';

const postIds = [1, 2, 3];
const fetchPost = (postId) => fetch(`https://foo.com/post/${postId}`);
const posts = await seriesWith<Post>(postIds, fetchPost);

// fetches the next post, only when the previous fetch has been resolved
// → [
//    { id: 1, title: 'Post #1' },
//    { id: 2, title: 'Post #2' },
//    { id: 3, title: 'Post #3' },
// ]
```

## API

### `seriesWith<T>(collection, iteratee)`

Creates an array of values by running each element in `collection` through `iteratee`, each one running once the previous iteration has completed.

#### collection: T[]

A list of items to be iterated on.

#### iteratee: (x: unknown) => Promise&lt;T&gt; | T

An asynchronous or synchronous function to apply for each item in `collection`.

#### return value: Promise&lt;T[]&gt;

A Promise returning a list of items resulting from applying `iteratee` on each item on `collection`, each only after the previous settled.

## Install

```bash
$ npm install @tuplo/series-with

# or with yarn
$ yarn add @tuplo/series-with
```

## Contribute

Contributions are always welcome!

## License

MIT
