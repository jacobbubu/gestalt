import assert from 'assert';

export default types => ({
  name: 'CreatePost',
  inputFields: {
    title: types.String,
    text: types.String,
  },
  outputFields: {
    user: types.User,
  },
  mutateAndGetPayload: async (input, context, info) => {
    const {title, text} = input;
    const {db, session} = context;
    const {currentUserId} = session;

    assert(title.length > 0, 'post must have title');
    assert(text.length > 0, 'post must have text');

    const user = await db.findBy('users', {id: currentUserId});

    const post = await db.insert('posts', {
      createdAt: new Date(),
      authoredByUserId: currentUserId,
      title,
      text,
    });

    return {user};
  },
});