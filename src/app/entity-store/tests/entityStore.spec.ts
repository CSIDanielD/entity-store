import { BehaviorSubject } from "rxjs";
import { EntityStore } from "../entityStore";
import { Post, posts } from "./test.setup";

interface PostsState {
  posts: Post[];
}

function getDefaultState(): PostsState {
  return { posts: posts };
}

describe("State selection", () => {
  let postStore = new EntityStore(getDefaultState());

  beforeEach(() => {
    postStore = new EntityStore(getDefaultState());
  });

  it("can select observable of entire state");
  it("can select observable of a single state property");
  it("can select observable of collection of properties");

  it("can select current value of entire state", () => {
    const selected = postStore.getValue();
    const created = getDefaultState();
    expect(selected).toEqual(created);
  });

  it("can select current value of a single state property", () => {
    const pred = (p: Post) => p.id === 7;
    const selected = postStore.getValue((s) => s.posts.find(pred));
    const created = getDefaultState().posts.find(pred);
    expect(selected).toEqual(created);
  });

  it("can select current value of collection of properties");
});

describe("Updating state", () => {
  it("can produce a new state");
  it("can produce a new state asynchronously");
  it("does not update the state on errors");
});

describe("Change detection", () => {
  it("emits when the state changes");
  it("emits only when the selected property changes");
});

describe("Error handling", () => {});

describe("Effects", () => {
  it("registers effects");
  it("triggers effects on change");
});
