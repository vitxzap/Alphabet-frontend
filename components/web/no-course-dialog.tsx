"use client";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../ui/dialog";
import { CourseForm } from "./course-form";

export default function NoCourseDialog({
  isWithoutCourse,
}: {
  isWithoutCourse: boolean;
}) {
  const [open, setOpen] = useState<boolean>();
  useEffect(() => {
    setOpen(isWithoutCourse);
  }, []);
  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Course code needed</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          It seems you dont have any course yet. Please provide your course code
          to use the application.
        </DialogDescription>
        <CourseForm />
      </DialogContent>
    </Dialog>
  );
}
