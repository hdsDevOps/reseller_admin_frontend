<div className="lg:col-span-2 col-span-1 border border-custom-white shadow-md rounded-lg flex flex-col">
            <p
              className="p-4 font-inter font-bold text-base tracking-[1px] text-black opacity-50 border-b border-[#D0D3D8]"
            >Revenue Distribution</p>

            <div className="w-full my-auto">
              <PieChart width={200} height={200} className="mx-auto">
                <Pie
                  data={data1}
                  // cx={120}
                  // cy={100}
                  innerRadius={40}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  startAngle={90}
                  endAngle={450}
                >
                  {data1.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                  <Label
                    value="Total"
                    position="center"
                    dy={-15}
                    style={{ fontSize: '12px', fontWeight: 'normal', fill: '#333' }}
                  />
                  <Label
                    value={data1[0].value}
                    dy={15}
                    position="centerBottom"
                    style={{ fontSize: '24px', fontWeight: 'bold', fill: '#333' }}
                  />
                </Pie>
              </PieChart>
              
              <div
                className="flex flex-col justify-end text-end p-5 gap-2"
              >
                {/* <p className="font-inter font-bold text-base tracking-[1px] text-[#2A2B2D]">TEXT_SUB (100%)</p>
                <p className="font-inter font-normal text-base text-[#727A8B]">Why are my stats inaccurate?</p> */}
              </div>
            </div>
          </div>