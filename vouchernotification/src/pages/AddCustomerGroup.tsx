import { MoveLeft } from 'lucide-react';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const AddCustomerGroup: React.FC = () =>  {
  const navigate = useNavigate();

  const formList = [
    {label: 'Group name', placholder: 'Enter group name', type: 'text', name: 'gname'},
    {label: 'Country', placholder: 'Select country', type: 'select', name: 'country'},
    {label: 'Region', placholder: 'Select region', type: 'select', name: 'region'},
    {label: 'Subscription Plan', placholder: 'Select a plan', type: 'select', name: 'subscriptionPlan'},
    {label: 'Expiry Date Range', placholder: 'Select date range', type: 'date', name: 'expiryDate'},
    {label: 'License Usage', placholder: 'Select number  ', type: 'number', name: 'licenseUsage'},
    {label: 'Number of customer', placholder: 'Auto-filled', type: 'number', name: 'numberOfCustomer'},
  ];
  return (
    <div>
      <div
        className='flex flex-row mb-20'
      >
        <a
          className='cursor-pointer'
          onClick={() => {
            navigate(-1);
          }}
        >
          <MoveLeft
            className='h-[20px] text-black mt-[7px]'
          />
        </a>
        <h3
          className='h3-text ml-[10px]'
        >Customer Information</h3>
      </div>

      <form>
        <div
          className='grid grid-cols-1 sm:grid-cols-2'
        >
          {
            formList && formList.map((item, index) => {
              if(item.type == 'select'){
                return(
                  <div className='flex flex-col px-2 mb-2'>
                    <label
                      className='search-input-label'
                    >{item.label}</label>
                    <select
                      className='search-select-text'
                    >
                      <option hidden selected value=''>{item.placholder}</option>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                    </select>
                  </div>
                )
              }
              else if(item.type == 'date'){
                return(
                  <div
                    className='flex flex-col px-2 mb-2'
                  >
                    <label
                      className='search-input-label'
                    >{item.label}</label>
                    <input
                      type='text'
                      onFocus={e => {
                        e.target.type='date'
                      }}
                      onBlur={e => {
                        e.target.type='text'
                      }}
                      placeholder={item.placholder}
                      name={item.name}
                      required
                      className='search-input-text px-4'
                      // onChange={updateCustomer}
                      // value={customer[item.name]}
                    />
                  </div>
                )
              }
              else{
                return(
                  <div
                    className='flex flex-col px-2 mb-2'
                  >
                    <label
                      className='search-input-label'
                    >{item.label}</label>
                    <input
                      type={item.type}
                      placeholder={item.placholder}
                      name={item.name}
                      required
                      className='search-input-text px-4'
                      // onChange={updateCustomer}
                      // value={customer[item.name]}
                    />
                  </div>
                )
              }
            })
          }
        </div>
        <div
          className='mt-4 flex flex-row max-sm:justify-center mb-3 sm:ml-2'
        >
          <button
            className='btn-green-2 h-[46px]'
          >Save</button>
          <button
            type='button'
            className='btn-red h-[46px] ml-[30px]'
          >Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default AddCustomerGroup