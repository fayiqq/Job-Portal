import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });

            if (res.data.success) {
                setIsApplied(true); // Update the local state
                const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] }
                dispatch(setSingleJob(updatedSingleJob)); // helps us to real time UI update
                toast.success(res.data.message);

            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id)) // Ensure the state is in sync with fetched data
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    return (
        <div className="bg-gray-50 min-h-screen py-10">
            <div className="max-w-5xl mx-auto px-6">

                {/* Job Card */}
                <div className="bg-white shadow-lg rounded-2xl p-8">

                    {/* Top Section */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">
                                {singleJob?.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-3 mt-4">
                                <Badge className="text-blue-700 font-semibold" variant="secondary">
                                    {singleJob?.postion} Positions
                                </Badge>

                                <Badge className="text-[#F83002] font-semibold" variant="secondary">
                                    {singleJob?.jobType}
                                </Badge>

                                <Badge className="text-[#7209b7] font-semibold" variant="secondary">
                                    {singleJob?.salary} LPA
                                </Badge>
                            </div>
                        </div>

                        <Button
                            onClick={isApplied ? null : applyJobHandler}
                            disabled={isApplied}
                            className={`rounded-xl px-6 py-3 text-white font-medium transition 
          ${isApplied
                                    ? 'bg-gray-500 cursor-not-allowed'
                                    : 'bg-[#7209b7] hover:bg-[#5f32ad]'}`}
                        >
                            {isApplied ? 'Already Applied' : 'Apply Now'}
                        </Button>
                    </div>

                    {/* Divider */}
                    <div className="my-8 border-t border-gray-200"></div>

                    {/* Job Description */}
                    <h2 className="text-xl font-semibold mb-6">Job Details</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-10 text-gray-700">

                        <div>
                            <p className="font-semibold">Role</p>
                            <p>{singleJob?.title}</p>
                        </div>

                        <div>
                            <p className="font-semibold">Location</p>
                            <p>{singleJob?.location}</p>
                        </div>

                        <div>
                            <p className="font-semibold">Experience</p>
                            <p>{singleJob?.experience} yrs</p>
                        </div>

                        <div>
                            <p className="font-semibold">Salary</p>
                            <p>{singleJob?.salary} LPA</p>
                        </div>

                        <div>
                            <p className="font-semibold">Total Applicants</p>
                            <p>{singleJob?.applications?.length}</p>
                        </div>

                        <div>
                            <p className="font-semibold">Posted Date</p>
                            <p>{singleJob?.createdAt.split("T")[0]}</p>
                        </div>
                    </div>

                    {/* Description Full Width */}
                    <div className="mt-8">
                        <p className="font-semibold mb-2">Description</p>
                        <p className="text-gray-700 leading-relaxed">
                            {singleJob?.description}
                        </p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default JobDescription