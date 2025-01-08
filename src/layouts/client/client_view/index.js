import React from 'react';
import { Col, Divider, Drawer, Row } from 'antd';
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
  UncontrolledTooltip,
} from "reactstrap";

// DescriptionItem component
const DescriptionItem = ({ title, content }) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">{title}:</p>
    {content}
  </div>
);

// ClientViewMoreDrawer component
const ClientViewMoreDrawer = ({ open, onClose }) => (
  <Drawer width={1000} placement="right" closable={false} onClose={onClose} open={open}>
    <p className="site-description-item-profile-p" style={{ marginBottom: 24 }}>User Profile</p>
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
    <p className="site-description-item-profile-p">Health Visit</p>
    <Box sx={{ p: 2 }}>
      <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
        <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
          <Typography className='mr-3' gutterBottom variant="h7" component="div">
            Date of Report:
          </Typography>
          <Typography gutterBottom variant="h7" component="div">
            09/10/2023
          </Typography>
        </Stack>
        <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
          <Typography className='mr-3' gutterBottom variant="h7" component="div">
            Duration:
          </Typography>
          <Typography gutterBottom variant="h7" component="div">
            2 Weeks
          </Typography>
        </Stack>
      </Stack>
      <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
        <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
          <Typography className='mr-3' gutterBottom variant="h7" component="div">
            Severity:
          </Typography>
          <Typography gutterBottom variant="h7" component="div">
            Moderate
          </Typography>
        </Stack>
        <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
          <Typography className='mr-3' gutterBottom variant="h7" component="div">
            Symptoms:
          </Typography>
          <Typography gutterBottom variant="h7" component="div">
            Cough, fever, shortness of breath
          </Typography>
        </Stack>
      </Stack>
      <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
        <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
          <Typography className='mr-3' gutterBottom variant="h7" component="div">
          Diagnosis:
          </Typography>
          <Typography gutterBottom variant="h7" component="div">
          Pneumonia
          </Typography>
        </Stack>
        <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
          <Typography className='mr-3' gutterBottom variant="h7" component="div">
          Diagnosis Date:
          </Typography>
          <Typography gutterBottom variant="h7" component="div">
            09/12/2024
          </Typography>
        </Stack>
      </Stack>
      <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
        <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
          <Typography className='mr-3' gutterBottom variant="h7" component="div">
          Past Medical History:
          </Typography>
          <Typography gutterBottom variant="h7" component="div">
          History of asthma
          </Typography>
        </Stack>
        <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
          <Typography className='mr-3' gutterBottom variant="h7" component="div">
          Allergies:
          </Typography>
          <Typography gutterBottom variant="h7" component="div">
          Penicillin
          </Typography>
        </Stack>
      </Stack>
      <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
        <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
          <Typography className='mr-3' gutterBottom variant="h7" component="div">
          Diagnostic Tests:
          </Typography>
          <Typography gutterBottom variant="h7" component="div">
          Chest X-ray, blood test
          </Typography>
        </Stack>
        <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
          <Typography className='mr-3' gutterBottom variant="h7" component="div">
          Test Results:
          </Typography>
          <Typography gutterBottom variant="h7" component="div">
          X-ray: Infiltrates in the lungs; Blood test
          </Typography>
        </Stack>
      </Stack>
      <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
        <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
          <Typography className='mr-3' gutterBottom variant="h7" component="div">
          Treatment Plan:
          </Typography>
          <Typography gutterBottom variant="h7" component="div">
          Antibiotics for 10 days, increased fluid intake, rest
          </Typography>
        </Stack>
        <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
          <Typography className='mr-3' gutterBottom variant="h7" component="div">
          Follow-Up Date:
          </Typography>
          <Typography gutterBottom variant="h7" component="div">
          2024-11-20
          </Typography>
        </Stack>
      </Stack>
      <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
        <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
          <Typography className='mr-3' gutterBottom variant="h7" component="div">
          Expected Recovery Time:
          </Typography>
          <Typography gutterBottom variant="h7" component="div">
          Antibiotics for 10 days, increased fluid intake, rest
          </Typography>
        </Stack>
        <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
          <Typography className='mr-3' gutterBottom variant="h7" component="div">
          Additional Notes:
          </Typography>
          <Typography gutterBottom variant="h7" component="div">
          Patient advised 
          </Typography>
        </Stack>
      </Stack>



    </Box>
    <Divider />
    <p className="site-description-item-profile-p">Appointment Visit</p>
    <Box sx={{ p: 2 }}>
      <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
        <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
          <Typography className='mr-3' gutterBottom variant="h7" component="div">
            Status:
          </Typography>
          <Typography gutterBottom variant="h7" component="div">
            Pending
          </Typography>
        </Stack>
        <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
          <Typography className='mr-3' gutterBottom variant="h7" component="div">
            Budget:
          </Typography>
          <Typography gutterBottom variant="h7" component="div">
            $2500USD
          </Typography>
        </Stack>
      </Stack>
      <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
        <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
          <Typography className='mr-3' gutterBottom variant="h7" component="div">
            Employes:
          </Typography>
          <div className="avatar-group">
            <a
              className="avatar avatar-sm"
              href="#pablo"
              id="tooltip742438047"
              onClick={(e) => e.preventDefault()}
            >
              <img
                alt="..."
                className="rounded-circle"
                src={require("../../../assets/img/theme/team-1-800x800.jpg")}
              />
            </a>
            <UncontrolledTooltip
              delay={0}
              target="tooltip742438047"
            >
              Ryan Tompson
            </UncontrolledTooltip>
            <a
              className="avatar avatar-sm"
              href="#pablo"
              id="tooltip941738690"
              onClick={(e) => e.preventDefault()}
            >
              <img
                alt="..."
                className="rounded-circle"
                src={require("../../../assets/img/theme/team-2-800x800.jpg")}
              />
            </a>
            <UncontrolledTooltip
              delay={0}
              target="tooltip941738690"
            >
              Romina Hadid
            </UncontrolledTooltip>
            <a
              className="avatar avatar-sm"
              href="#pablo"
              id="tooltip804044742"
              onClick={(e) => e.preventDefault()}
            >
              <img
                alt="..."
                className="rounded-circle"
                src={require("../../../assets/img/theme/team-3-800x800.jpg")}
              />
            </a>
            <UncontrolledTooltip
              delay={0}
              target="tooltip804044742"
            >
              Alexander Smith
            </UncontrolledTooltip>
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

        </Stack>
        <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
          <Typography className='mr-3' gutterBottom variant="h7" component="div">
            Completion:
          </Typography>
          <Typography gutterBottom variant="h7" component="div">
            70%
          </Typography>
        </Stack>
      </Stack>

    </Box>
  </Drawer>
);

export default ClientViewMoreDrawer;