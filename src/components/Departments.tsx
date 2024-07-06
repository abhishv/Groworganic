import  { useState } from 'react';
import { Checkbox, List, ListItem, ListItemText, IconButton, Collapse } from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import { departments } from '../data/departments';

const Departments = () => {
  const [expanded, setExpanded] = useState<string[]>([]);
  const [selected, setSelected] = useState<{ [key: string]: string[] }>({});

  const handleToggle = (department: string) => {
    setExpanded(expanded.includes(department)
      ? expanded.filter(item => item !== department)
      : [...expanded, department]);
  };

  const handleSelectDepartment = (department: string) => {
    const subDepartments = departments.find(d => d.name === department)?.subDepartments || [];
    if (selected[department]?.length === subDepartments.length) {
      setSelected(prev => ({ ...prev, [department]: [] }));
    } else {
      setSelected(prev => ({ ...prev, [department]: subDepartments }));
    }
  };

  const handleSelectSubDepartment = (department: string, subDepartment: string) => {
    const isSelected = selected[department]?.includes(subDepartment);
    setSelected(prev => ({
      ...prev,
      [department]: isSelected
        ? prev[department].filter(item => item !== subDepartment)
        : [...(prev[department] || []), subDepartment]
    }));
  };

  const isDepartmentChecked = (department: string) => {
    const subDepartments = departments.find(d => d.name === department)?.subDepartments || [];
    return selected[department]?.length === subDepartments.length;
  };

  const isDepartmentIndeterminate = (department: string) => {
    const subDepartments = departments.find(d => d.name === department)?.subDepartments || [];
    return selected[department]?.length > 0 && selected[department]?.length < subDepartments.length;
  };

  return (
    <List>
      {departments.map(department => (
        <div key={department.name}>
          <ListItem>
            <Checkbox
              checked={isDepartmentChecked(department.name)}
              indeterminate={isDepartmentIndeterminate(department.name)}
              onChange={() => handleSelectDepartment(department.name)}
            />
            <ListItemText primary={department.name} />
            <IconButton onClick={() => handleToggle(department.name)}>
              {expanded.includes(department.name) ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          </ListItem>
          <Collapse in={expanded.includes(department.name)} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {department.subDepartments.map(subDepartment => (
                <ListItem key={subDepartment} sx={{ pl: 4 }}>
                  <Checkbox
                    checked={selected[department.name]?.includes(subDepartment)}
                    onChange={() => handleSelectSubDepartment(department.name, subDepartment)}
                  />
                  <ListItemText primary={subDepartment} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </div>
      ))}
    </List>
  );
};

export default Departments;
