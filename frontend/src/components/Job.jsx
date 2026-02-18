import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = ({ job }) => {
    const navigate = useNavigate();
    // const jobId = "lsekdhjgdsnfvsdkjf";

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
    }

    return (
        
        <div className="p-6 rounded-2xl shadow-md bg-white border border-gray-100 hover:shadow-lg transition duration-300">

            {/* Top Row */}
            <div className="flex items-center justify-between">
                <p className="text-xs text-gray-500">
                    {daysAgoFunction(job?.createdAt) === 0
                        ? "Today"
                        : `${daysAgoFunction(job?.createdAt)} days ago`}
                </p>

                <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100">
                    <Bookmark className="w-5 h-5 text-gray-600" />
                </Button>
            </div>

            {/* Company Section */}
            <div className="flex items-center gap-4 mt-4">

                {/* Logo */}
                <div className="h-14 w-14 rounded-xl bg-gray-50 border flex items-center justify-center overflow-hidden">
                    <Avatar className="h-10 w-10">
                        <AvatarImage src={job?.company?.logo} />
                    </Avatar>
                </div>

                {/* Company Info */}
                <div>
                    <h2 className="font-semibold text-base text-gray-800">
                        {job?.company?.name}
                    </h2>
                    <p className="text-sm text-gray-500">
                        {job?.location || "India"}
                    </p>
                </div>
            </div>

            {/* Job Title + Description */}
            <div className="mt-5">
                <h1 className="font-bold text-xl text-gray-900 hover:text-[#7209b7] transition cursor-pointer">
                    {job?.title}
                </h1>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2 mt-5">
                <Badge className="text-blue-700 font-medium" variant="secondary">
                    {job?.position} Positions
                </Badge>

                <Badge className="text-[#F83002] font-medium" variant="secondary">
                    {job?.jobType}
                </Badge>

                <Badge className="text-[#7209b7] font-medium" variant="secondary">
                    {job?.salary} LPA
                </Badge>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-3 mt-6">
                <Button
                    onClick={() => navigate(`/description/${job?._id}`)}
                    variant="outline"
                    className="flex-1"
                >
                    Details
                </Button>

                <Button className="flex-1 bg-[#7209b7] hover:bg-[#5f32ad]">
                    Save
                </Button>
            </div>
        </div>

    )
}

export default Job