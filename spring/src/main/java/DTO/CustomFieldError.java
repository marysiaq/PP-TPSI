package DTO;

public class CustomFieldError {
    private String field;
    private String message;

    public CustomFieldError() {
    }

    public CustomFieldError(String code, String defaultMessage) {
        field=code;
        message=defaultMessage;
    }

    public String getField() {
        return field;
    }

    public void setField(String field) {
        this.field = field;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
