import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { addDoctor } from '../utils/localStorage';

const DoctorForm = () => {
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: {
      name: '',
      specialty: '',
      phone: '',
      email: '',
      image: '',
      available: true
    }
  });

  const specialties = [
    'კარდიოლოგია',
    'დერმატოლოგია',
    'პედიატრია',
    'ორთოპედია',
    'ნევროლოგია',
    'რადიოლოგია',
    'ოფთალმოლოგია',
    'ფსიქიატრია',
    'შინაგანი მედიცინა',
    'გადაუდებელი მედიცინა',
    'ოჯახის მედიცინა',
    'გინეკოლოგია',
    'ონკოლოგია',
    'უროლოგია',
    'ანესთეზიოლოგია'
  ];

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // If no image provided, generate a placeholder
      if (!data.image) {
        data.image = `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}&background=22c55e&color=fff&size=300`;
      }

      // Convert availability string to boolean
      data.available = data.available === 'true';

      await addDoctor(data);
      setIsSuccess(true);
      reset();
      
      setTimeout(() => {
        navigate('/doctors');
      }, 2000);
    } catch (error) {
      console.error('Error adding doctor:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <h3 className="text-lg font-semibold text-green-900 mb-2">
            ექიმი წარმატებით დაემატა!
          </h3>
          <p className="text-green-700 mb-4">
            ახალი ექიმი სისტემაში დაემატა. მალე გადაიყვანებით ექიმების გვერდზე.
          </p>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white shadow-md rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            ახალი ექიმის დამატება
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            შეავსეთ ქვემოთ მოცემული ველები კლინიკაში ახალი ექიმის დასამატებლად
          </p>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          {/* Doctor Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              სრული სახელი *
            </label>
            <input
              type="text"
              id="name"
              {...register('name', { 
                required: 'გთხოვთ შეიყვანოთ ექიმის სახელი',
                minLength: { value: 2, message: 'სახელი უნდა შეიცავდეს მინიმუმ 2 სიმბოლოს' }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              placeholder="დოქტორი ნიკოლოზ ბერიძე"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          {/* Specialty */}
          <div>
            <label htmlFor="specialty" className="block text-sm font-medium text-gray-700 mb-2">
              სამედიცინო სპეციალობა *
            </label>
            <select
              id="specialty"
              {...register('specialty', { required: 'გთხოვთ აირჩიოთ სპეციალობა' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">აირჩიეთ სპეციალობა...</option>
              {specialties.map((specialty) => (
                <option key={specialty} value={specialty}>
                  {specialty}
                </option>
              ))}
            </select>
            {errors.specialty && (
              <p className="mt-1 text-sm text-red-600">{errors.specialty.message}</p>
            )}
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
              საკონტაქტო ინფორმაცია
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  ტელეფონის ნომერი *
                </label>
                <input
                  type="tel"
                  id="phone"
                  {...register('phone', { 
                    required: 'გთხოვთ შეიყვანოთ ტელეფონის ნომერი',
                    pattern: {
                      value: /^[\+]?[1-9][\d]{0,15}$/,
                      message: 'გთხოვთ შეიყვანოთ სწორი ტელეფონის ნომერი'
                    }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  placeholder="+995 (599) 12-34-56"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  ელ-ფოსტის მისამართი *
                </label>
                <input
                  type="email"
                  id="email"
                  {...register('email', { 
                    required: 'გთხოვთ შეიყვანოთ ელ-ფოსტის მისამართი',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'გთხოვთ შეიყვანოთ სწორი ელ-ფოსტის მისამართი'
                    }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  placeholder="doctor@clinic.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Profile Image URL */}
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
              პროფილის სურათის URL (არასავალდებულო)
            </label>
            <input
              type="url"
              id="image"
              {...register('image', {
                pattern: {
                  value: /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i,
                  message: 'გთხოვთ შეიყვანოთ სწორი სურათის URL'
                }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              placeholder="https://example.com/photo.jpg"
            />
            {errors.image && (
              <p className="mt-1 text-sm text-red-600">{errors.image.message}</p>
            )}
            <p className="mt-1 text-xs text-gray-500">
              დატოვეთ ცარიელი ავტომატური ავატარის გენერირებისთვის
            </p>
          </div>

          {/* Availability Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ხელმისაწვდომობის სტატუსი
            </label>
            <div className="flex items-center space-x-6">
              <label className="flex items-center">
                <input
                  type="radio"
                  {...register('available')}
                  value="true"
                  defaultChecked
                  className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">ხელმისაწვდომი</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  {...register('available')}
                  value="false"
                  className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">დაკავებული</span>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={() => navigate('/doctors')}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
            >
              გაუქმება
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  ექიმის დამატება...
                </div>
              ) : (
                'ექიმის დამატება'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DoctorForm; 