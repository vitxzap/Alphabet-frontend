import z from "zod";

export const CourseFormSchema = z.object({
  courseCode: z.string().min(6).nonempty(),
});

export type CourseFormType = z.infer<typeof CourseFormSchema>;
