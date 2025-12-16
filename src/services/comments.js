import api from "@/lib/axios";

export const postComment = async ({ type, id, slug, data, userId }) => {
  if (type === "course") {
    return api.post(`/courses/${id}/comments/`, {
      course: id,
      parent: data.parent ?? null,
      content: data.content,
      is_approved: true,
    });
  }

  if (type === "blog") {
    return api.post(`/blogs/${id}/${slug}/comments/`, {
      blog: id,
      user: userId,
      parent: data.parent ?? null,
      content: data.content,
    });
  }

  throw new Error("Invalid comment type");
};
