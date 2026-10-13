package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class UserController {

    @Autowired
    private UserRepository ur;

    @GetMapping("/h")
    public String m1() {
        return "hey";
    }

    @GetMapping("/reg")
    public String m2() {
        return "reg";
    }
   
    @PostMapping("/register")
    public String m3(String username, String email, String psw, Model m) {
        Users u = new Users();
        u.setUsername(username);
        u.setEmail(email);
        u.setPassword(psw);
        this.ur.save(u);
        m.addAttribute("uname", username);
        m.addAttribute("mail", email);
        m.addAttribute("password", psw);
        return "result";
    }

    @PostMapping("/login")
    @ResponseBody
    public String m4(@RequestBody LoginData loginData) {
        Users eu = this.ur.findByUsername(loginData.getUsername());
        if (eu == null && loginData.getUsername() != null) {
            for (Users u : this.ur.findAll()) {
                if (u.getUsername().equalsIgnoreCase(loginData.getUsername())) {
                    eu = u;
                    break;
                }
            }
        }
        if (eu != null && eu.getPassword() != null && eu.getPassword().equals(loginData.getPassword())) {
            return "login done";
        } else {
            return "invalid data";
        }
    }

    @PostMapping("/update")
    @ResponseBody
    public String m5(@RequestBody Users userDetails) {
        Users eu = this.ur.findByUsername(userDetails.getUsername());
        if (eu != null) {
            eu.setEmail(userDetails.getEmail());
            eu.setPassword(userDetails.getPassword());
            this.ur.save(eu);
            return "update done";
        } else {
            return "user not found";
        }
    }

    @PostMapping("/delete")
    @ResponseBody
    public String m6(@RequestBody Users userDetails) {
        Users eu = this.ur.findByUsername(userDetails.getUsername());
        if (eu != null) {
            this.ur.delete(eu);
            return "delete done";
        } else {
            return "user not found";
        }
    }
}