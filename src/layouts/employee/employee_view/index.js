import React from 'react';
import { Col, Divider, Drawer, Row } from 'antd';
import { Timeline } from 'antd';

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {
  Badge,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Button,
  UncontrolledTooltip,
} from "reactstrap";

// DescriptionItem component
const DescriptionItem = ({ title, content }) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">{title}:</p>
    {content}
  </div>
);

// EmployeeViewMoreDrawer component
const EmployeeViewMoreDrawer = ({ open, onClose }) => (
  <Drawer width={1000} placement="right" closable={false} onClose={onClose} open={open}>
    <p className="site-description-item-profile-p" style={{ marginBottom: 24 }}>Employee Profile</p>
    <p className="site-description-item-profile-p">Personal</p>
    <Box sx={{ p: 2 }}>
      <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
        <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
          <Typography className='mr-3' gutterBottom variant="h7" component="div">
            Full Name:
          </Typography>
          <Typography gutterBottom variant="h7" component="div">
            Ashton Mapunga
          </Typography>
        </Stack>
        <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
          <Typography className='mr-3' gutterBottom variant="h7" component="div">
            Address:
          </Typography>
          <Typography gutterBottom variant="h7" component="div">
            2267 Chitungwiza
          </Typography>
        </Stack>
      </Stack>
      <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
        <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
          <Typography className='mr-3' gutterBottom variant="h7" component="div">
            City:
          </Typography>
          <Typography gutterBottom variant="h7" component="div">
            Harare
          </Typography>
        </Stack>
        <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
          <Typography className='mr-3' gutterBottom variant="h7" component="div">
            Birthday:
          </Typography>
          <Typography gutterBottom variant="h7" component="div">
            09/12/1970
          </Typography>
        </Stack>
      </Stack>
      <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
        <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
          <Typography className='mr-3' gutterBottom variant="h7" component="div">
            Gender:
          </Typography>
          <Typography gutterBottom variant="h7" component="div">
            Male
          </Typography>
        </Stack>
        <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
          <Typography className='mr-3' gutterBottom variant="h7" component="div">
            ID:
          </Typography>
          <Typography gutterBottom variant="h7" component="div">
            09-275787L09
          </Typography>
        </Stack>
      </Stack>

      <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
        <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
          <Typography className='mr-3' gutterBottom variant="h7" component="div">
            Age:
          </Typography>
          <Typography gutterBottom variant="h7" component="div">
            25
          </Typography>
        </Stack>
        <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
          <Typography className='mr-3' gutterBottom variant="h7" component="div">
            Next Of Kin:
          </Typography>
          <Typography gutterBottom variant="h7" component="div">
            Prince Makaza
          </Typography>
        </Stack>

      </Stack>
      <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
        <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
          <Typography className='mr-3' gutterBottom variant="h7" component="div">
            Role:
          </Typography>
          <Typography gutterBottom variant="h7" component="div">
            Doctor
          </Typography>
        </Stack>
        <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
          <Typography className='mr-3' gutterBottom variant="h7" component="div">
            Car Insuarance:
          </Typography>
          <Typography gutterBottom variant="h7" component="div">
            3456
          </Typography>
        </Stack>

      </Stack>
    </Box>
    <Divider />
    <p className="site-description-item-profile-p">Contacts</p>
    <Box sx={{ p: 2 }}>
      <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
        <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
          <Typography className='mr-3' gutterBottom variant="h7" component="div">
            Phone Number:
          </Typography>
          <Typography gutterBottom variant="h7" component="div">
            +263712494841
          </Typography>
        </Stack>
        <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
          <Typography className='mr-3' gutterBottom variant="h7" component="div">
            Email:
          </Typography>
          <Typography gutterBottom variant="h7" component="div">
            ashtonmapunga@gmail.com
          </Typography>
        </Stack>
      </Stack>

    </Box>
  

    <Divider />
    <p className="site-description-item-profile-p">Appointent History</p>
    <Box sx={{ p: 2 }}>
     
    
      
      <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
      <Timeline
    items={[
      {
        children: 'This Week',
      },
      {
        children: 'Hours: 12:00 - 14:00',
      },
      {
        children: 'Appoinments: 23',
      },
      {
        children: 'Clients 23',
      },
    ]}
  />
           <Timeline
    items={[
      {
        children: 'This Month',
      },
      {
        children: 'Hours: 12:00 - 14:00',
      },
      {
        children: 'Appoinments: 133',
      },
      {
        children: 'Clients 23',
      },
    ]}
  />
      </Stack>
      <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0"></h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      View Appoinments History
                    </Button>
                  </div>
                </Row>



    </Box>
    <Divider />
    <p className="site-description-item-profile-p">Suggested Clients</p>
    <Box sx={{ p: 2 }}>
      
      <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
        <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
       
          <div className="avatar-group">
        
         
            <a
              className="avatar avatar-sm"
              href="#pablo"
              id="tooltip996637554"
              onClick={(e) => e.preventDefault()}
            >
              <img
                alt="..."
                className="rounded-circle"
                src={require("../../../assets/img/theme/team-4-800x800.jpg")}
              />
            </a>
            <UncontrolledTooltip
              delay={0}
              target="tooltip996637554"
            >
              Jessica Doe
            </UncontrolledTooltip>
          </div>
          <Typography className='mr-3' gutterBottom variant="h7" component="div">
          Ashton Mapunga          </Typography>

        </Stack>
        <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
          <Typography className='mr-3' gutterBottom variant="h7" component="div">
            Rate:
          </Typography>
          <Typography gutterBottom variant="h7" component="div">
            70%
          </Typography>
        </Stack>
      </Stack>
          
      <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
        <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
       
          <div className="avatar-group">
        
         
            <a
              className="avatar avatar-sm"
              href="#pablo"
              id="tooltip996637554"
              onClick={(e) => e.preventDefault()}
            >
              <img
                alt="..."
                className="rounded-circle"
                src={require("../../../assets/img/theme/team-4-800x800.jpg")}
              />
            </a>
            <UncontrolledTooltip
              delay={0}
              target="tooltip996637554"
            >
              Jessica Doe
            </UncontrolledTooltip>
          </div>
          <Typography className='mr-3' gutterBottom variant="h7" component="div">
          Prince Makaza          </Typography>

        </Stack>
        <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
          <Typography className='mr-3' gutterBottom variant="h7" component="div">
            Rate:
          </Typography>
          <Typography gutterBottom variant="h7" component="div">
            60%
          </Typography>
        </Stack>
      </Stack>
      <Row className="align-items-center mt-3">
                  <div className="col">
                    <h3 className="mb-0"></h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      View Suggested Clients
                    </Button>
                  </div>
                </Row>

    </Box>
  </Drawer>
);

export default EmployeeViewMoreDrawer;