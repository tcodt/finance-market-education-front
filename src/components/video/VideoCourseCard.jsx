import Link from "next/link";
import { createPageUrl } from "@/utils";

import { cn } from "@/lib/utils";

export default function VideoCourseCard({ course }) {
  return (
    <Link
      href={`/courses/${course.id}/`}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-[#D9D9D9] hover:shadow-xl transition-all duration-300"
    >
      {/* Course Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3">
          <span className="px-3 py-1 bg-[#000000] text-white text-xs font-medium rounded-full">
            {course.category}
          </span>
        </div>
        {course.progress > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/30">
            <div
              className="h-full bg-[#000000]"
              style={{ width: `${course.progress}%` }}
            />
          </div>
        )}
      </div>

      {/* Course Info */}
      <div className="p-5 space-y-3">
        <h3 className="text-lg font-bold text-[#000000] group-hover:text-[#000000] transition-colors line-clamp-2">
          {course.title}
        </h3>

        <p className="text-sm text-[#6E6E6E] line-clamp-2 leading-relaxed">
          {course.description}
        </p>

        {/* Instructor */}
        {course.instructor && (
          <div className="flex items-center gap-2 pt-2">
            <img
              src={course.instructor.avatar}
              alt={course.instructor.name}
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-sm text-[#6E6E6E]">
              {course.instructor.name}
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}
