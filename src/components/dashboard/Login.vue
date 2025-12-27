<script>
export default {
  name: "Login",
  data() {
    return {
      role: "admin",
      username: "",
      password: "",
      error: "",

      // ROLE-BASED ACCOUNTS
      accounts: {
        admin: {
          username: "admin@sys",
          password: "admin123",
          route: "/admin"
        },
        midwife: {
          username: "midwife@sys",
          password: "mid123",
          route: "/midwife"
        },
        "Ob-gyne": {
          username: "Ob-gyne@sys",
          password: "Ob-gyne123",
          route: "/Ob-gyne"
        },
        patient: {
          username: "patient@sys",
          password: "pat123",
          route: "/patient"
        }
      }
    };
  },
  methods: {
    login() {
      this.error = "";

      if (!this.username || !this.password) {
        this.error = "Please enter username and password.";
        return;
      }

      const account = this.accounts[this.role];

      if (
        this.username === account.username &&
        this.password === account.password
      ) {
        // SUCCESS → GO TO ROLE VIEW
        this.$router.push(account.route);
      } else {
        this.error = "Invalid credentials for selected role.";
      }
    }
  }
};
</script>
